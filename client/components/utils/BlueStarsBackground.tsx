import React from "react";
import { StyleSheet, ImageBackground } from "react-native";
import { getCloudinaryImageUrl } from "@/services/cloudinary";

interface Props {
    children?: React.ReactNode;
}

export const BlueStarsBackground: React.FC<Props> = ({ children }) => {
    const backgroundImage = getCloudinaryImageUrl(
        "blue_background_darker_d10kn5"
    );

    return (
        <ImageBackground
            source={{ uri: backgroundImage }}
            resizeMode="cover"
            style={styles.imageBackground}
        >
            {children}
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    imageBackground: {
        flex: 1,
        width: "100%",
        height: "100%",
    },
});
