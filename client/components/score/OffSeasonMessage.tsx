import { StyleSheet, View } from "react-native";
import { Image } from "expo-image";
import { getCloudinaryImageUrl } from "@/services/cloudinary.service";
import { ThemedText } from "@/components/ThemedText";
import { Colors } from "@/constants/Colors";
import { isOctober } from "@/constants/Dates";

interface OffSeasonMessageProps {
    previousYearScore?: number;
}

export const OffSeasonMessage: React.FC<OffSeasonMessageProps> = ({
    previousYearScore = 0,
}) => {
    const previousYear = new Date().getFullYear() - 1;
    const image = isOctober ? "13_xixisr" : "23-_zgpzq7";
    const message =
        previousYearScore > 0
            ? `Rendez-vous le 1er décembre pour tenter de surpasser les\u00A0${previousYearScore.toLocaleString(
                  "fr-FR",
              )}\u00A0points gagnés en ${previousYear}\u00A0!`
            : "Rendez-vous le 1er décembre pour commencer à gagner des\u00A0points\u00A0!";

    return (
        <View style={styles.container}>
            <ThemedText style={styles.text}>{message}</ThemedText>
            <Image
                source={{
                    uri: getCloudinaryImageUrl(image),
                }}
                style={styles.image}
                contentFit="cover"
                cachePolicy="memory-disk"
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { alignItems: "center" },
    text: {
        marginBottom: 20,
        marginTop: 10,
        color: Colors.snow,
        textAlign: "center",
    },
    image: {
        height: 150,
        width: 150,
    },
});
