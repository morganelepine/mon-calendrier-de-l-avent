import { Image } from "expo-image";
import type { ImageStyle } from "react-native";
import { getCloudinaryImageUrl } from "@/services/cloudinary.service";
import { StyleSheet, View } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { Colors } from "@/constants/Colors";
import { useUser } from "@/contexts/UserContext";
import { OnboardingSlideContent } from "./onboardingSlides";

interface Props {
    slide: OnboardingSlideContent;
}

export const OnboardingSlide: React.FC<Props> = ({ slide }) => {
    const { username } = useUser();

    return (
        <View style={styles.container}>
            <View style={styles.image}>
                <Image
                    source={{
                        uri: getCloudinaryImageUrl(slide.imageId),
                    }}
                    style={styles.image as ImageStyle}
                    contentFit="cover"
                    cachePolicy="memory-disk"
                />
            </View>

            <ThemedText type="freightNeoBoldSnow" style={styles.title}>
                {slide.showUsername && username
                    ? `Vous êtes désormais ${username}`
                    : slide.title}
            </ThemedText>

            <ThemedText style={styles.body}>{slide.body}</ThemedText>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 28,
        gap: 20,
    },
    image: {
        width: 100,
        height: 100,
        alignItems: "center",
        justifyContent: "center",
    },
    title: {
        fontSize: 24,
    },
    body: {
        textAlign: "center",
        color: Colors.snow,
    },
});
