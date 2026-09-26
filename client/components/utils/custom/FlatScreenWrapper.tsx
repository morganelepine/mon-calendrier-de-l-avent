import React from "react";
import { StyleSheet, View } from "react-native";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { ThemedText } from "@/components/ThemedText";
import { Colors, Theme } from "@/constants/Colors";
import { CloseContentButton } from "@/components/utils/buttons/CloseContentButton";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { isOctober } from "@/constants/Dates";

interface GameScreenWrapperProps {
    typeTitle: string | undefined;
    children?: React.ReactNode;
    dayId: number;
}

export const FlatScreenWrapper: React.FC<GameScreenWrapperProps> = ({
    typeTitle,
    children,
    dayId,
}) => {
    const insets = useSafeAreaInsets();

    const title = typeTitle || "Jeu du jour";

    const closeContent = async () => {
        if (isOctober) {
            router.navigate({ pathname: "/calendar" });
            return;
        }
        router.navigate({
            pathname: "/calendar/day/[id]",
            params: { id: String(dayId) },
        });
    };

    return (
        <View style={styles.container}>
            <View style={[styles.headerContainer, { paddingTop: insets.top }]}>
                <ThemedText type="contentTitle" style={styles.title}>
                    {title}
                </ThemedText>

                <CloseContentButton
                    onPress={closeContent}
                    style={{
                        backgroundColor: Colors.snow,
                        borderWidth: 1,
                        borderColor: Colors.snow,
                    }}
                >
                    <Ionicons
                        name={"return-up-back-outline"}
                        size={30}
                        color={Colors.snow}
                    />
                </CloseContentButton>
            </View>

            {children}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "space-between",
        alignItems: "flex-start",
        width: "100%",
        backgroundColor: Theme.autumnGreenDarkToGreen,
    },
    title: {
        color: Colors.snow,
    },
    headerContainer: {
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 20,
    },
});
