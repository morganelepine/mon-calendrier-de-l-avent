import React from "react";
import { StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Image } from "expo-image";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Colors, Theme } from "@/constants/Colors";
import { isOctober } from "@/constants/Dates";
import { ThemedText } from "@/components/ThemedText";
import ParallaxScrollView from "@/components/utils/ParallaxScrollView";
import { CloseContentButton } from "@/components/utils/buttons/CloseContentButton";
import { CustomScrollView } from "@/components/utils/custom/ScrollView";
import { getCloudinaryImageUrl } from "@/services/cloudinary.service";

interface ContentScreenWrapperProps {
    typeTitle: string | undefined;
    backgroundImage: string;
    children?: React.ReactNode;
    dayId: number;
}

export const ContentScreenWrapper: React.FC<ContentScreenWrapperProps> = ({
    typeTitle,
    backgroundImage,
    children,
    dayId,
}) => {
    const insets = useSafeAreaInsets();

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

    // Octobre : même format "plat" que les jeux (voir GameScreenWrapper)
    if (isOctober) {
        return (
            <>
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
                        size={35}
                        color={Colors.snow}
                    />
                </CloseContentButton>

                <View style={styles.flatContainer}>
                    <ThemedText
                        type="contentTitle"
                        style={[styles.flatTitle, { paddingTop: insets.top }]}
                    >
                        {title}
                    </ThemedText>

                    <CustomScrollView>
                        <View style={styles.flatChildrenContainer}>
                            {children}
                        </View>
                    </CustomScrollView>
                </View>
            </>
        );
    }

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
                        source={{ uri: getCloudinaryImageUrl(backgroundImage) }}
                        style={styles.headerImage}
                        contentFit="cover"
                        cachePolicy="memory-disk"
                    />
                }
            >
                <View style={styles.container}>
                    <ThemedText type="contentTitle">{title}</ThemedText>

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
    flatContainer: {
        flex: 1,
        justifyContent: "space-between",
        alignItems: "flex-start",
        width: "100%",
        backgroundColor: Theme.header,
    },
    flatTitle: {
        paddingHorizontal: 20,
        color: Colors.snow,
    },
    flatChildrenContainer: {
        paddingHorizontal: 20,
        marginVertical: 20,
    },
});
