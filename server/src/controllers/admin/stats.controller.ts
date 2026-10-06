import { Request, Response, NextFunction } from "express";
import { Prisma } from "@prisma/client";
import { prisma } from "../../lib/prisma";
import { ScoreType } from "../score.controller";
import { POSSIBLE_USERNAMES_COUNT } from "../user.controller";
import { usernames } from "../../data/usernames";

const curatedUsernames = [...new Set(usernames)];

const CONTENT_TYPE_BY_ITEM_NUMBER: Record<number, string> = {
    1: "story",
    2: "idea",
    3: "anecdote",
    4: "game",
};

interface CountRow {
    key: number;
    users: bigint;
}

interface CohortRow {
    returning: boolean;
    active: boolean;
    count: bigint;
}

interface DateRow {
    date: Date;
    count: bigint;
}

// A Postgres DATE comes back as a Date at UTC midnight.
const toDateKey = (date: Date): string => date.toISOString().slice(0, 10);

export class AdminStatsController {
    // GET /admin/stats?year=2026&season=christmas
    async get(request: Request, response: Response, next: NextFunction) {
        const year = Number(request.query.year) || new Date().getFullYear();
        const season =
            request.query.season === "halloween" ? "halloween" : "christmas";
        const isChristmas = season === "christmas";

        const dayOpeningReason = isChristmas
            ? ScoreType.DayOpening
            : ScoreType.OctoberOpening;

        const [
            openingsByDay,
            openingsByItem,
            newUsersByDate,
            premiumByDate,
            cohorts,
            totalUsers,
            usersWithPushToken,
            premiumUsers,
            groupCount,
            groupMemberCount,
            usersInGroup,
            assignedCuratedUsernames,
        ] = await Promise.all([
            prisma.$queryRaw<CountRow[]>`
                SELECT "day" AS key, COUNT(DISTINCT "userId") AS users
                FROM "Score"
                WHERE "year" = ${year} AND "reason" = ${dayOpeningReason}
                GROUP BY "day"
                ORDER BY "day"`,
            isChristmas
                ? prisma.$queryRaw<CountRow[]>`
                    SELECT "itemNumber" AS key, COUNT(DISTINCT "userId") AS users
                    FROM "Score"
                    WHERE "year" = ${year} AND "reason" = ${ScoreType.ContentOpening}
                    GROUP BY 1
                    ORDER BY 1`
                : Promise.resolve([]),
            // Timestamps are stored in UTC but bucketed in French time,
            // so a sign-up at 00:30 on Dec 3rd counts for Dec 3rd.
            prisma.$queryRaw<DateRow[]>`
                SELECT ("createdAt" AT TIME ZONE 'UTC' AT TIME ZONE 'Europe/Paris')::date AS date,
                       COUNT(*) AS count
                FROM "User"
                WHERE EXTRACT(YEAR FROM "createdAt" AT TIME ZONE 'UTC' AT TIME ZONE 'Europe/Paris') = ${year}
                GROUP BY date
                ORDER BY date`,
            prisma.$queryRaw<DateRow[]>`
                SELECT ("premiumSince" AT TIME ZONE 'UTC' AT TIME ZONE 'Europe/Paris')::date AS date,
                       COUNT(*) AS count
                FROM "User"
                WHERE "isPremium" = true
                  AND EXTRACT(YEAR FROM "premiumSince" AT TIME ZONE 'UTC' AT TIME ZONE 'Europe/Paris') = ${year}
                GROUP BY date
                ORDER BY date`,
            // Users created up to the selected year, split by whether they signed up before it (returning)
            // and whether they have any Score row that year (active).
            prisma.$queryRaw<CohortRow[]>`
                SELECT EXTRACT(YEAR FROM u."createdAt" AT TIME ZONE 'UTC' AT TIME ZONE 'Europe/Paris') < ${year} AS returning,
                       EXISTS (
                           SELECT 1 FROM "Score" s
                           WHERE s."userId" = u."id" AND s."year" = ${year}
                       ) AS active,
                       COUNT(*) AS count
                FROM "User" u
                WHERE EXTRACT(YEAR FROM u."createdAt" AT TIME ZONE 'UTC' AT TIME ZONE 'Europe/Paris') <= ${year}
                GROUP BY 1, 2`,
            prisma.user.count(),
            prisma.user.count({ where: { pushToken: { not: null } } }),
            prisma.user.count({ where: { isPremium: true } }),
            prisma.group.count(),
            prisma.groupMember.count(),
            prisma.user.count({ where: { memberships: { some: {} } } }),
            prisma.user.count({
                where: { username: { in: curatedUsernames } },
            }),
        ]);

        const toDateSeries = (rows: DateRow[]) =>
            rows.map((row) => ({
                date: toDateKey(row.date),
                count: Number(row.count),
            }));

        const cohortCount = (returning: boolean, active: boolean) =>
            Number(
                cohorts.find(
                    (row) => row.returning === returning && row.active === active,
                )?.count ?? 0,
            );

        return {
            status: 200,
            year,
            season,
            openingsByDay: openingsByDay.map((row) => ({
                day: row.key,
                users: Number(row.users),
            })),
            openingsByType: isChristmas
                ? openingsByItem.map((row: CountRow) => ({
                      type: CONTENT_TYPE_BY_ITEM_NUMBER[row.key] ?? "unknown",
                      users: Number(row.users),
                  }))
                : null,
            newUsersByDate: toDateSeries(newUsersByDate),
            userCohorts: {
                returningActive: cohortCount(true, true),
                returningInactive: cohortCount(true, false),
                newActive: cohortCount(false, true),
                newInactive: cohortCount(false, false),
            },
            notifications: { withToken: usersWithPushToken, total: totalUsers },
            premium: {
                premium: premiumUsers,
                total: totalUsers,
                byDate: toDateSeries(premiumByDate),
            },
            usernames: {
                possible: POSSIBLE_USERNAMES_COUNT,
                curated: curatedUsernames.length,
                curatedAvailable:
                    curatedUsernames.length - assignedCuratedUsernames,
            },
            groups: {
                count: groupCount,
                avgSize: groupCount ? groupMemberCount / groupCount : 0,
                usersInGroup,
                totalUsers,
            },
        };
    }
}
