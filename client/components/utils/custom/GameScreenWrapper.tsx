import React from "react";
import { StyleSheet, View } from "react-native";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { ThemedText } from "@/components/ThemedText";
import { Colors } from "@/constants/Colors";
import { ContentType } from "@/enums/enums";
import { CloseContentButton } from "@/components/utils/buttons/CloseContentButton";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface GameScreenWrapperProps {
    contentType: string;
    children?: React.ReactNode;
    dayId: number;
}

export const GameScreenWrapper: React.FC<GameScreenWrapperProps> = ({
    contentType,
    children,
    dayId,
}) => {
    const insets = useSafeAreaInsets();

    const getTitle = () => {
        switch (contentType) {
            case ContentType.Game:
                return "Jeu du jour";
            case ContentType.Quiz:
                return "Quiz du jour";
            default:
                return "Jeu du jour";
        }
    };

    const closeContent = async () => {
        router.navigate({
            pathname: `/calendar/day/${String(dayId)}`,
        });
    };

    return (
        <>
            <CloseContentButton
                onPress={closeContent}
                style={{
                    backgroundColor: Colors.snow,
                    borderWidth: 1,
                    borderColor: Colors.green,
                }}
            >
                <Ionicons
                    name={"return-up-back-outline"}
                    size={35}
                    color={Colors.snow}
                />
            </CloseContentButton>

            <View style={styles.container}>
                <ThemedText
                    type="contentTitle"
                    style={[styles.title, { paddingTop: insets.top }]}
                >
                    {getTitle()}
                </ThemedText>

                {children}
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "space-between",
        alignItems: "flex-start",
        width: "100%",
        backgroundColor: Colors.green,
    },
    title: {
        paddingBottom: 2,
        paddingHorizontal: 20,
        color: Colors.snow,
    },
});
