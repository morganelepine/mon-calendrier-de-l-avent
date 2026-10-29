import { StyleSheet, View } from "react-native";
import { Image } from "expo-image";
import { ThemedText } from "@/components/ThemedText";
import { Colors } from "@/constants/Colors";
import { getCloudinaryImageUrl } from "@/services/cloudinary.service";

interface ComparisonProps {
    text: string | null;
    image?: string; // Cloudinary id
}

// "Comme / plus que X % des joueurs" line, hidden when there's nothing to say.
export const Comparison: React.FC<ComparisonProps> = ({ text, image }) =>
    text ? (
        <View style={styles.container}>
            {image && (
                <Image
                    source={{ uri: getCloudinaryImageUrl(image) }}
                    cachePolicy="memory-disk"
                    style={styles.image}
                />
            )}
            <ThemedText style={styles.text}>{text}</ThemedText>
        </View>
    ) : null;

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        justifyContent: "center",
        marginTop: 12,
        paddingHorizontal: 16,
        paddingTop: 12,
        paddingBottom: 8,
    },
    image: {
        width: 42,
        height: 42,
    },
    text: {
        fontSize: 14,
        color: Colors.green,
        textAlign: "center",
        fontFamily: "FreightNeo",
    },
});
