import AsyncStorage from "@react-native-async-storage/async-storage";
import { Score } from "@/interfaces/scoreInterfaces";
import { ScoreType } from "@/enums/enums";

export const generateScoresData = (): Score[] => {
    const scoresData: Score[] = [];
    for (let i = 1; i <= 24; i++) {
        scoresData.push({
            dayNumber: i,
            scoreTotal: 0,
            scoreDetails: {
                dayOpening: 0,
                contentOpening: 0,
                game: {
                    correctAnswer: 0,
                    played: false,
                },
            },
        });
    }
    return scoresData;
};

export const loadScores = async (): Promise<Score[]> => {
    const savedScores = await AsyncStorage.getItem("scoresData");
    return savedScores ? JSON.parse(savedScores) : generateScoresData();
};

export const saveScores = async (scoresData: Score[]): Promise<void> => {
    await AsyncStorage.setItem("scoresData", JSON.stringify(scoresData));
};

export const updateScore = async (
    dayId: number,
    scoreType: number
): Promise<void> => {
    await updateScores(dayId, scoreType);
};

export const updateScores = async (
    dayId: number,
    scoreType: number
): Promise<void> => {
    const scoresData = await loadScores();

    const scoreOfTheDay = scoresData.find(
        (score: Score) => score.dayNumber === dayId
    );

    if (scoreOfTheDay) {
        const scoreDetails = scoreOfTheDay.scoreDetails;
        let addedScore = 0;

        switch (scoreType) {
            case ScoreType.ContentOpening: // 10 ou 20 points * 4 (* 24)
                addedScore = await checkContentOpeningScore(
                    dayId,
                    scoreOfTheDay
                );
                break;
            case ScoreType.GameCorrectAnswer: // 10 ou 20 points * 3 (* 12)
                if (!scoreOfTheDay.scoreDetails.game.played) {
                    addedScore = await checkGameScore(dayId, scoreOfTheDay);
                }
                break;
            case ScoreType.DayOpening: // 40 points (* 24)
                if (scoreDetails.dayOpening === 0) {
                    scoreDetails.dayOpening = 40;
                    addedScore = 40;
                }
                break;
        }

        scoreOfTheDay.scoreTotal += addedScore;
    }

    saveScores(scoresData);
};

export const getTotalScore = async (): Promise<number> => {
    const scores = await loadScores();
    let totalScore: number = 0;

    if (scores) {
        scores.forEach((score: Score) => {
            totalScore += score.scoreTotal;
        });
    }

    return totalScore;
};

export const checkContentOpeningScore = async (
    dayId: number,
    scoreOfTheDay: Score
): Promise<number> => {
    const today = new Date().getDate();

    let addedScore = 0;
    const scoreOnTime = 20;
    const scoreLate = 10;

    if (today === dayId && scoreOfTheDay.scoreDetails.contentOpening < 80) {
        scoreOfTheDay.scoreDetails.contentOpening += scoreOnTime;
        addedScore += scoreOnTime;
    } else if (scoreOfTheDay.scoreDetails.contentOpening < 40) {
        scoreOfTheDay.scoreDetails.contentOpening += scoreLate;
        addedScore += scoreLate;
    }

    return addedScore;
};

export const checkGameScore = async (
    dayId: number,
    scoreOfTheDay: Score
): Promise<number> => {
    const today = new Date().getDate();

    let addedScore = 0;
    const scoreOnTime = 20;
    const scoreLate = 10;

    if (today === dayId && scoreOfTheDay.scoreDetails.game.correctAnswer < 60) {
        scoreOfTheDay.scoreDetails.game.correctAnswer += scoreOnTime;
        addedScore += scoreOnTime;
    } else if (scoreOfTheDay.scoreDetails.game.correctAnswer < 30) {
        scoreOfTheDay.scoreDetails.game.correctAnswer += scoreLate;
        addedScore += scoreLate;
    }

    return addedScore;
};

export const setGameStatus = async (day: number): Promise<void> => {
    const scores = await loadScores();

    if (scores) {
        const scoreOfTheDay = scores.find(
            (score: Score) => score.dayNumber === day
        );
        if (scoreOfTheDay) {
            scoreOfTheDay.scoreDetails.game.played = true;
            await saveScores(scores);
        }
    }
};
