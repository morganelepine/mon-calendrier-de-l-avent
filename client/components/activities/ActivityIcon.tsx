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
            source={{ uri: getCloudinaryImageUrl(image) }}
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
        width: "85%",
        height: "85%",
    },
});
