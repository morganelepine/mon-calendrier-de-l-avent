import { StyleSheet } from "react-native";
import { BlueBackground } from "@/components/utils/BlueBackground";
import { Image } from "expo-image";
import { getCloudinaryImageUrl } from "@/services/cloudinary.service";

interface Props {
    image?: string;
    children?: React.ReactNode;
}

export const BackgroundImage: React.FC<Props> = ({ image, children }) => {
    const backgroundImage = getCloudinaryImageUrl(
        image || "blue_background_darker_d10kn5",
    );

    return (
        <BlueBackground>
            <Image
                source={{ uri: backgroundImage }}
                style={StyleSheet.absoluteFill}
                // transition={300}
                contentFit="cover"
                cachePolicy="memory-disk"
            />
            {children}
        </BlueBackground>
    );
};
