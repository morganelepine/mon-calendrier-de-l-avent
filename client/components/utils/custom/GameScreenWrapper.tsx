import React from "react";
import { StyleSheet, View, ImageBackground } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ThemedText } from "@/components/ThemedText";
import { ContentType } from "@/enums/enums";
import { getCloudinaryImageUrl } from "@/services/cloudinary";

interface GameScreenWrapperProps {
    contentType: string;
    children?: React.ReactNode;
}

export const GameScreenWrapper: React.FC<GameScreenWrapperProps> = ({
    contentType,
    children,
}) => {
    const insets = useSafeAreaInsets();
    const backgroundImage = getCloudinaryImageUrl("ofcjdqqjsl6qecpcn8xh");

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

    return (
        <ImageBackground
            source={{ uri: backgroundImage }}
            resizeMode="cover"
            style={styles.imageBackground}
        >
            <View style={styles.centeredView}>
                <ThemedText
                    type="contentTitle"
                    style={[{ paddingTop: insets.top * 1.5 }]}
                >
                    {getTitle()}
                </ThemedText>

                {children}
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    imageBackground: {
        flex: 1,
    },
    centeredView: {
        flex: 1,
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
    },
});
