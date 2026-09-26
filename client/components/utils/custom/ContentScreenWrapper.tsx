import React from "react";
import { StyleSheet, View } from "react-native";
import { Image } from "expo-image";
import { router } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import { isOctober } from "@/constants/Dates";
import { ThemedText } from "@/components/ThemedText";
import ParallaxScrollView from "@/components/utils/ParallaxScrollView";
import { FlatScreenWrapper } from "@/components/utils/custom/FlatScreenWrapper";
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

    // Octobre : même format "plat" que les jeux (voir FlatScreenWrapper)
    if (isOctober) {
        return (
            <FlatScreenWrapper typeTitle={title} dayId={dayId}>
                <CustomScrollView>
                    <View style={{ padding: 20 }}>{children}</View>
                </CustomScrollView>
            </FlatScreenWrapper>
        );
    }

    return (
        <>
            <View
                style={[
                    styles.floatingCloseButton,
                    { top: insets.top + 10 },
                ]}
            >
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
            </View>
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
    floatingCloseButton: {
        position: "absolute",
        right: 20,
        zIndex: 1,
    },
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
