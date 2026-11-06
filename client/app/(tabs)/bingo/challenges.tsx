import { useState } from "react";
import { ScrollView, StyleSheet } from "react-native";
import { BlueBackground } from "@/components/utils/BlueBackground";
import { ChallengeCard } from "@/components/challenges/ChallengeCard";
import { ChallengeHintModal } from "@/components/challenges/ChallengeHintModal";
import { CHALLENGES } from "@/data/challenges_data";
import { Challenge } from "@/interfaces/challengeInterface";

export default function ChallengesScreen() {
    const [selectedChallenge, setSelectedChallenge] =
        useState<Challenge | null>(null);

    return (
        <BlueBackground>
            <ScrollView contentContainerStyle={styles.container}>
                {CHALLENGES.map((challenge) => (
                    <ChallengeCard
                        key={challenge.id}
                        challenge={challenge}
                        onPress={setSelectedChallenge}
                    />
                ))}
            </ScrollView>

            <ChallengeHintModal
                challenge={selectedChallenge}
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
