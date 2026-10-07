import React from "react";
import { StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { ThemedText } from "@/components/ThemedText";
import { CloseContentButton } from "@/components/utils/buttons/CloseContentButton";
import ParallaxScrollView from "@/components/utils/ParallaxScrollView";
import { isOctober } from "@/constants/Dates";
import { Colors, Theme } from "@/constants/Colors";
import { getCloudinaryImageUrl } from "@/services/cloudinary.service";

const HEADER_IMAGE_HEIGHT = 250;

interface GameScreenWrapperProps {
    typeTitle: string | undefined;
    children?: React.ReactNode;
    dayId: number;
    headerImage?: string;
}

export const FlatScreenWrapper: React.FC<GameScreenWrapperProps> = ({
    typeTitle,
    children,
    dayId,
    headerImage,
}) => {
    const insets = useSafeAreaInsets();
    const headerHeight = insets.top + HEADER_IMAGE_HEIGHT;

    const title = typeTitle || "Contenu du jour";

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

    const renderHeader = (showTitle: boolean, showButton: boolean) => (
        <View style={[styles.headerContainer, { paddingTop: insets.top }]}>
            <ThemedText
                type="contentTitle"
                style={[styles.title, !showTitle && styles.hidden]}
            >
                {title}
            </ThemedText>

            {showButton ? (
                <CloseContentButton
                    onPress={closeContent}
                    style={
                        headerImage
                            ? {
                                  backgroundColor: isOctober
                                      ? Colors.autumnGold
                                      : Colors.darkGreen,
                                  borderWidth: 0.5,
                                  borderColor: Colors.snow,
                              }
                            : {
                                  backgroundColor: Colors.snow,
                                  borderWidth: 1,
                                  borderColor: Colors.snow,
                              }
                    }
                >
                    <Ionicons
                        name={"return-up-back-outline"}
                        size={30}
                        color={Colors.snow}
                    />
                </CloseContentButton>
            ) : (
                <View style={styles.buttonPlaceholder} />
            )}
        </View>
    );

    if (headerImage) {
        return (
            <View style={styles.parallaxContainer}>
                <ParallaxScrollView
                    headerHeight={headerHeight}
                    headerBackgroundColor={{
                        light: Colors.snow,
                        dark: Colors.darkBlue,
                    }}
                    headerImage={
                        <Image
                            source={{ uri: getCloudinaryImageUrl(headerImage) }}
                            style={StyleSheet.absoluteFill}
                            contentFit="cover"
                            cachePolicy="memory-disk"
                        />
                    }
                    headerOverlay={
                        <>
                            <LinearGradient
                                colors={["rgba(0,0,0,0.8)", "transparent"]}
                                style={StyleSheet.absoluteFill}
                            />
                            {renderHeader(true, false)}
                        </>
                    }
                >
                    {children}
                </ParallaxScrollView>

                <View style={styles.fixedHeader} pointerEvents="box-none">
                    {renderHeader(false, true)}
                </View>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            {renderHeader(true, true)}

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
    parallaxContainer: {
        flex: 1,
        width: "100%",
        backgroundColor: Colors.snow,
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
    fixedHeader: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
    },
    hidden: {
        opacity: 0,
    },
    buttonPlaceholder: {
        height: 40,
        width: 40,
    },
});
