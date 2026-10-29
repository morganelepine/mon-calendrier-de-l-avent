import { StyleSheet, View } from "react-native";
import { Image } from "expo-image";
import { getCloudinaryImageUrl } from "@/services/cloudinary.service";

interface ActivityIconProps {
    image: string; // Cloudinary public ID
    backgroundColor: string;
    size?: number;
}

export const ActivityIcon: React.FC<ActivityIconProps> = ({
    image,
    backgroundColor,
    size = 56,
}) => (
    <View
        accessible={false}
        style={[
            styles.container,
            { width: size, height: size, backgroundColor },
        ]}
    >
        <Image
            // 3x the display size, for high-density screens.
            source={{
                uri: getCloudinaryImageUrl(
                    image,
                    `w_${size * 3},h_${size * 3},c_fit`,
                ),
            }}
            contentFit="contain"
            cachePolicy="memory-disk"
            style={styles.image}
        />
    </View>
);

const styles = StyleSheet.create({
    container: {
        borderRadius: 16,
        justifyContent: "center",
        alignItems: "center",
    },
    image: {
        width: "75%",
        height: "75%",
    },
});
