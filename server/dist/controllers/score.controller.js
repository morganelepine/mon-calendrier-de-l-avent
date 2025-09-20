"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScoreController = exports.ScoreType = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
var ScoreType;
(function (ScoreType) {
    ScoreType["ContentOpening"] = "ContentOpening";
    ScoreType["GameAnswer"] = "GameAnswer";
    ScoreType["DayOpening"] = "DayOpening";
})(ScoreType || (exports.ScoreType = ScoreType = {}));
class ScoreController {
    getUser(uuid) {
        return __awaiter(this, void 0, void 0, function* () {
            return prisma.user.findUnique({ where: { uuid } });
        });
    }
    saveScore(request) {
        return __awaiter(this, void 0, void 0, function* () {
            const { userUuid, dayId, points, reason, questionNumber } = request.body;
            const user = yield this.getUser(userUuid);
            if (!user)
                return { status: 404, message: "User not found" };
            const scoreOfTheDay = yield prisma.score.findMany({
                where: {
                    userId: user.id,
                    day: dayId,
                    reason: reason,
                },
            });
            if (reason === ScoreType.DayOpening && scoreOfTheDay.length >= 1) {
                return {
                    status: 400,
                    message: "All points for day opening have been awarded",
                };
            }
            if (reason === ScoreType.ContentOpening && scoreOfTheDay.length >= 4) {
                return {
                    status: 400,
                    message: "All points for content openings have been awarded",
                };
            }
            if (reason === ScoreType.GameAnswer) {
                const gameAlreadyPlayed = yield prisma.score.findFirst({
                    where: {
                        userId: user.id,
                        day: dayId,
                        reason: ScoreType.GameAnswer,
                        questionNumber: questionNumber,
                    },
                });
                if (gameAlreadyPlayed) {
                    return {
                        status: 400,
                        message: "Points for this question have already been awarded",
                    };
                }
                if (scoreOfTheDay.length >= 3) {
                    return {
                        status: 400,
                        message: "All points for the game have been awarded",
                    };
                }
            }
            // Create score
            const createdScore = yield prisma.score.create({
                data: {
                    userId: user.id,
                    day: dayId,
                    points,
                    reason,
                    questionNumber,
                },
            });
            // Update user total score
            const updatedUser = yield prisma.user.update({
                where: { id: user.id },
                data: { score: user.score + points },
            });
            return {
                status: 200,
                message: "Score is saved",
                score: createdScore,
                totalScore: updatedUser.score,
            };
        });
    }
    getUserTotalScore(request) {
        return __awaiter(this, void 0, void 0, function* () {
            const uuid = request.params.uuid;
            const user = yield this.getUser(uuid);
            if (!user)
                return { status: 404, message: "User not found" };
            return { totalScore: user.score };
        });
    }
    getUserScoresByDay(request) {
        return __awaiter(this, void 0, void 0, function* () {
            const uuid = request.params.uuid;
            const user = yield this.getUser(uuid);
            if (!user)
                return { status: 404, message: "User not found" };
            const scores = yield prisma.score.findMany({
                where: { userId: user.id },
                orderBy: { day: "asc" },
            });
            const scoresByDay = {};
            for (let day = 1; day <= 24; day++) {
                scoresByDay[day] = {
                    dayNumber: day,
                    scoreTotal: 0,
                    scoreDetails: {
                        dayOpening: 0,
                        contentOpening: 0,
                        gameAnswer: 0,
                    },
                };
            }
            for (const score of scores) {
                scoresByDay[score.day].scoreTotal += score.points;
                switch (score.reason) {
                    case ScoreType.DayOpening:
                        scoresByDay[score.day].scoreDetails.dayOpening +=
                            score.points;
                        break;
                    case ScoreType.ContentOpening:
                        scoresByDay[score.day].scoreDetails.contentOpening +=
                            score.points;
                        break;
                    case ScoreType.GameAnswer:
                        scoresByDay[score.day].scoreDetails.gameAnswer +=
                            score.points;
                        break;
                }
            }
            return Object.values(scoresByDay);
        });
    }
    getLeaderboard() {
        return __awaiter(this, void 0, void 0, function* () {
            const leaderboard = yield prisma.user.findMany({
                orderBy: { score: "desc" },
                select: { username: true, score: true },
            });
            return leaderboard;
        });
    }
    isDayOpen(request) {
        return __awaiter(this, void 0, void 0, function* () {
            const { uuid, day } = request.params;
            const user = yield this.getUser(uuid);
            if (!user)
                return { status: 404, message: "User not found" };
            const score = yield prisma.score.findFirst({
                where: {
                    userId: user.id,
                    day: Number(day),
                    reason: ScoreType.DayOpening,
                },
            });
            return {
                dayId: Number(day),
                isOpen: !!score,
            };
        });
    }
}
exports.ScoreController = ScoreController;
//# sourceMappingURL=score.controller.js.map