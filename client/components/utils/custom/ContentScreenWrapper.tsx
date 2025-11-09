import React from "react";
import { StyleSheet, View, Image } from "react-native";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import { ContentType } from "@/enums/enums";
import { ThemedText } from "@/components/ThemedText";
import ParallaxScrollView from "@/components/utils/ParallaxScrollView";
import { CloseContentButton } from "@/components/utils/buttons/CloseContentButton";

interface ContentScreenWrapperProps {
    contentType: string | undefined;
    backgroundImage: string;
    children?: React.ReactNode;
    dayId: number;
}

export const ContentScreenWrapper: React.FC<ContentScreenWrapperProps> = ({
    contentType,
    backgroundImage,
    children,
    dayId,
}) => {
    const today = new Date().getDate();

    const getTitle = () => {
        if (contentType === ContentType.Story && today > 24) {
            return "Les souliers rouges";
        }

        switch (contentType) {
            case ContentType.Story:
                return "L'histoire du\u00A0jour";
            case ContentType.Anecdote:
                return "L'anecdote du\u00A0jour";
            case ContentType.Word:
                return "Le mot du jour";
            case ContentType.Song:
                return "La chanson du\u00A0jour";
            case ContentType.Drink:
                return "La boisson du\u00A0jour";

            case ContentType.Idea:
                return "L'idée du jour";
            default:
                return "Contenu du jour";
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
                style={{ backgroundColor: Colors.snow }}
            >
                <Ionicons
                    name={"return-up-back-outline"}
                    size={35}
                    color={Colors.green}
                />
            </CloseContentButton>
            <ParallaxScrollView
                headerBackgroundColor={{
                    light: Colors.snow,
                    dark: Colors.darkBlue,
                }}
                headerImage={
                    <Image
                        source={{ uri: backgroundImage }}
                        style={styles.headerImage}
                        resizeMode="cover"
                    />
                }
            >
                <View style={styles.container}>
                    <ThemedText type="contentTitle">{getTitle()}</ThemedText>

                    {children}
                </View>
            </ParallaxScrollView>
        </>
    );
};

const styles = StyleSheet.create({
    headerImage: {
        height: "100%",
        width: "100%",
    },
    container: {
        paddingBottom: 20,
        paddingHorizontal: 20,
        justifyContent: "space-between",
        flex: 1,
    },
});
