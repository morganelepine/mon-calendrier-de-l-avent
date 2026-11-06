import { useEffect, useState } from "react";
import { ScrollView, StyleSheet } from "react-native";
import { BlueBackground } from "@/components/utils/BlueBackground";
import { ChallengeCard } from "@/components/challenges/ChallengeCard";
import { ChallengeHintModal } from "@/components/challenges/ChallengeHintModal";
import { CHALLENGES } from "@/data/challenges_data";
import { Challenge } from "@/interfaces/challengeInterface";
import { getCompletedChallengeIds } from "@/services/challenge.service";

export default function ChallengesScreen() {
    const [selectedChallenge, setSelectedChallenge] =
        useState<Challenge | null>(null);
    const [completedIds, setCompletedIds] = useState<Set<number>>(new Set());

    useEffect(() => {
        getCompletedChallengeIds()
            .then(setCompletedIds)
            .catch(() => {});
    }, []);

    return (
        <BlueBackground>
            <ScrollView contentContainerStyle={styles.container}>
                {CHALLENGES.map((challenge, index) => (
                    <ChallengeCard
                        key={challenge.id}
                        challenge={challenge}
                        number={index + 1}
                        completed={completedIds.has(challenge.id)}
                        onPress={setSelectedChallenge}
                    />
                ))}
            </ScrollView>

            <ChallengeHintModal
                challenge={selectedChallenge}
                completed={
                    selectedChallenge !== null &&
                    completedIds.has(selectedChallenge.id)
                }
                onClose={() => setSelectedChallenge(null)}
            />
        </BlueBackground>
    );
}

const styles = StyleSheet.create({
    container: {
        gap: 12,
        padding: 20,
    },
});
