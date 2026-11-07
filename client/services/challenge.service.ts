import { showChallengeToast } from "@/components/challenges/ChallengeToast";
import { currentDay, isDecember } from "@/constants/Dates";
import { CHALLENGE_POINTS, CHALLENGES } from "@/data/challenges_data";
import { ScoreType } from "@/enums/enums";
import {
    isItemScored,
    queueScore,
    saveItemScored,
} from "@/services/score.service";

// A challenge counts once a year whatever the day it's completed on,
// so its local "already scored" flag isn't stored under a real day.
const LOCAL_STATE_DAY = 0;
// The score history only has lines up to the calendar's last day.
const LAST_HISTORY_DAY = 24;

// Two triggers can fire at once (app launch + foreground): without this,
// both would pass the async "already scored" check and show the toast twice.
const claimedIds = new Set<number>();

const isCompleted = (id: number): Promise<boolean> =>
    isItemScored(LOCAL_STATE_DAY, ScoreType.Challenge, id);

export const getCompletedChallengeIds = async (): Promise<Set<number>> => {
    const completed = await Promise.all(
        CHALLENGES.map(({ id }) => isCompleted(id)),
    );
    return new Set(
        CHALLENGES.filter((_, index) => completed[index]).map(({ id }) => id),
    );
};

export const completeChallenge = async (id: number): Promise<void> => {
    if (!isDecember || claimedIds.has(id)) return;
    claimedIds.add(id);

    try {
        const challenge = CHALLENGES.find((item) => item.id === id);
        if (!challenge || (await isCompleted(id))) return;

        await saveItemScored(LOCAL_STATE_DAY, ScoreType.Challenge, id);
        void queueScore(
            Math.min(currentDay, LAST_HISTORY_DAY),
            CHALLENGE_POINTS,
            String(ScoreType.Challenge),
            id,
        );
        showChallengeToast(challenge);
    } catch {
        claimedIds.delete(id); // Storage failure: the next trigger retries.
    }
};
