import React from "react";
import { StyleSheet, View, Image } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { Colors } from "@/constants/Colors";
import { ContentType } from "@/enums/enums";
import ParallaxScrollView from "@/components/utils/ParallaxScrollView";

interface ContentScreenWrapperProps {
    contentType: string | undefined;
    backgroundImage: string;
    children?: React.ReactNode;
}

export const ContentScreenWrapper: React.FC<ContentScreenWrapperProps> = ({
    contentType,
    backgroundImage,
    children,
}) => {
    const today = new Date().getDate();

    const getTitle = () => {
        if (contentType === ContentType.Story && today > 24) {
            return "Les souliers rouges";
        }

        switch (contentType) {
            case ContentType.Story:
                return "Histoire du jour";
            case ContentType.Anecdote:
                return "Anecdote du\u00A0jour";
            case ContentType.Idea:
                return "Idée du jour";
            default:
                return "Contenu du jour";
        }
    };

    return (
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
