import { useMemo, useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { Image } from "expo-image";
import { ThemedText } from "@/components/ThemedText";
import { CustomMarkdown } from "@/components/utils/custom/Markdown";
import { CustomButton } from "@/components/utils/buttons/Button";
import { Colors, Theme } from "@/constants/Colors";
import { Content, PersonalityQuizAnswer } from "@/interfaces/contentInterface";
import { getCloudinaryImageUrl } from "@/services/cloudinary.service";
import {
    computeProfile,
    parsePersonalityQuiz,
} from "@/services/personalityQuiz.service";

interface PersonalityQuizProps {
    idea: Content;
}

export const PersonalityQuiz: React.FC<PersonalityQuizProps> = ({ idea }) => {
    const quiz = useMemo(
        () => parsePersonalityQuiz(idea.content1),
        [idea.content1],
    );

    const [chosenAnswers, setChosenAnswers] = useState<PersonalityQuizAnswer[]>(
        [],
    );

    if (!quiz) return null;

    const isFinished = chosenAnswers.length === quiz.questions.length;
    const currentQuestion = quiz.questions[chosenAnswers.length];
    const profileKey = isFinished ? computeProfile(quiz, chosenAnswers) : null;
    const profile = profileKey ? quiz.profiles[profileKey] : null;

    const restart = () => {
        setChosenAnswers([]);
    };

    return (
        <View>
            <ThemedText type="contentSubtitle">{idea.title}</ThemedText>

            {!isFinished && (
                <>
                    <ThemedText style={styles.progress}>
                        Question {chosenAnswers.length + 1} /{" "}
                        {quiz.questions.length}
                    </ThemedText>
                    <CustomMarkdown style={{ marginVertical: 20 }}>
                        {currentQuestion.question}
                    </CustomMarkdown>
                    <View style={{ marginBottom: 20 }}>
                        {currentQuestion.answers.map((answer) => (
                            <Pressable
                                key={answer.text}
                                onPress={() =>
                                    setChosenAnswers((answers) => [
                                        ...answers,
                                        answer,
                                    ])
                                }
                                style={({ pressed }) => [
                                    styles.answer,
                                    pressed && styles.pressedAnswer,
                                ]}
                            >
                                <ThemedText style={styles.answerText}>
                                    {answer.text}
                                </ThemedText>
                            </Pressable>
                        ))}
                    </View>
                </>
            )}

            {isFinished && profile && (
                <>
                    <ThemedText style={styles.progress}>Vous êtes…</ThemedText>
                    <ThemedText
                        type="contentSubtitle"
                        style={{ color: Theme.orangeToGreen }}
                    >
                        {profile.title}
                    </ThemedText>
                    {profile.image && (
                        <View style={styles.imageContainer}>
                            <Image
                                source={{
                                    uri: getCloudinaryImageUrl(profile.image),
                                }}
                                style={styles.image}
                                contentFit="cover"
                                cachePolicy="memory-disk"
                            />
                        </View>
                    )}
                    <CustomMarkdown>{profile.description}</CustomMarkdown>
                    <CustomButton
                        style={styles.button}
                        color={Theme.orangeToGreen}
                        onPress={restart}
                    >
                        Recommencer
                    </CustomButton>
                </>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    progress: {
        color: Theme.orangeToGreen,
        fontSize: 14,
    },
    answer: {
        backgroundColor: Theme.autumnGreenDarkToGreen,
        marginVertical: 5,
        borderRadius: 50,
        paddingHorizontal: 20,
        paddingVertical: 5,
        justifyContent: "center",
        alignItems: "center",
        minHeight: 48,
    },
    pressedAnswer: {
        opacity: 0.7,
    },
    answerText: {
        color: Colors.snow,
        fontSize: 16,
        textAlign: "center",
    },
    imageContainer: {
        alignItems: "center",
        marginVertical: 10,
    },
    image: {
        width: "100%",
        height: 150,
        borderRadius: 10,
    },
    button: {
        marginTop: 20,
    },
});
