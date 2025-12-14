import { StyleSheet, View } from "react-native";
import { Image } from "expo-image";
import { getCloudinaryImageUrl } from "@/services/cloudinary";

interface Props {
    image?: string;
    children?: React.ReactNode;
}

export const BackgroundImage: React.FC<Props> = ({ image, children }) => {
    const backgroundImage = getCloudinaryImageUrl(
        image || "blue_background_darker_d10kn5"
    );

    return (
        <View style={{ flex: 1 }}>
            <Image
                source={{ uri: backgroundImage }}
                style={StyleSheet.absoluteFill}
                // transition={300}
                contentFit="cover"
                cachePolicy="memory-disk"
            />
            {children}
        </View>
    );
};
