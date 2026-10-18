import { useEffect, useRef, useState } from "react";
import {
    Modal,
    Pressable,
    ScrollView,
    StyleSheet,
    useWindowDimensions,
    View,
} from "react-native";
import { Image } from "expo-image";
import { CustomButton } from "@/components/utils/buttons/Button";
import {
    CARD_HEIGHT,
    CARD_WIDTH,
    ShareCard,
} from "@/components/utils/share/ShareCard";
import { Colors, Theme } from "@/constants/Colors";
import { getCloudinaryImageUrl } from "@/services/cloudinary.service";
import { shareView } from "@/services/share.service";

const THUMBNAIL_WIDTH = 56;
const THUMBNAIL_HEIGHT = 70;

interface ShareBackgroundPickerProps {
    visible: boolean;
    onClose: () => void;
    backgrounds: string[]; // Cloudinary ids, the first one selected by default
    message: string;
    contentPosition?: "center" | "top";
    children: React.ReactNode; // content of the card
}

// Preview of the share image, with a choice of backgrounds before sharing.
export const ShareBackgroundPicker: React.FC<ShareBackgroundPickerProps> = ({
    visible,
    onClose,
    backgrounds,
    message,
    contentPosition,
    children,
}) => {
    const { width, height } = useWindowDimensions();
    const shareCardRef = useRef<View>(null);
    const [selected, setSelected] = useState(0);
    const [sharing, setSharing] = useState(false);

    useEffect(() => {
        if (visible) setSelected(0);
    }, [visible]);

    // The card keeps its 360x450 layout for the capture, only the preview is scaled.
    const scale = Math.min(
        1,
        (width - 40) / CARD_WIDTH,
        (height - 260) / CARD_HEIGHT,
    );

    const share = async () => {
        setSharing(true);
        await shareView(shareCardRef, message);
        setSharing(false);
        onClose();
    };

    return (
        <Modal
            visible={visible}
            transparent
            animationType="fade"
            onRequestClose={onClose}
        >
            <View style={styles.overlay}>
                <View
                    style={{
                        width: CARD_WIDTH * scale,
                        height: CARD_HEIGHT * scale,
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <View style={{ transform: [{ scale }] }}>
                        <ShareCard
                            ref={shareCardRef}
                            backgroundImage={backgrounds[selected]}
                            contentPosition={contentPosition}
                            offscreen={false}
                        >
                            {children}
                        </ShareCard>
                    </View>
                </View>

                {backgrounds.length > 1 && (
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.thumbnails}
                        style={styles.thumbnailsScroll}
                    >
                        {backgrounds.map((background, index) => (
                            <Pressable
                                key={background}
                                onPress={() => setSelected(index)}
                                style={[
                                    styles.thumbnail,
                                    index === selected &&
                                        styles.selectedThumbnail,
                                ]}
                            >
                                <Image
                                    source={{
                                        uri: getCloudinaryImageUrl(
                                            background,
                                            "w_200",
                                        ),
                                    }}
                                    style={styles.thumbnailImage}
                                    contentFit="cover"
                                    cachePolicy="memory-disk"
                                />
                            </Pressable>
                        ))}
                    </ScrollView>
                )}

                <View style={styles.buttons}>
                    <CustomButton
                        style={styles.button}
                        color="transparent"
                        onPress={onClose}
                        disabled={sharing}
                    >
                        Annuler
                    </CustomButton>
                    <CustomButton
                        style={styles.button}
                        color={Theme.orangeToBlue}
                        onPress={share}
                        loading={sharing}
                        disabled={sharing}
                    >
                        Partager
                    </CustomButton>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(0,0,0,0.85)",
        paddingHorizontal: 20,
    },
    thumbnailsScroll: {
        flexGrow: 0,
        marginTop: 16,
    },
    thumbnails: {
        gap: 10,
        paddingHorizontal: 4,
    },
    thumbnail: {
        width: THUMBNAIL_WIDTH,
        height: THUMBNAIL_HEIGHT,
        borderRadius: 8,
        overflow: "hidden",
        borderWidth: 2,
        borderColor: "transparent",
        opacity: 0.6,
    },
    thumbnailImage: {
        flex: 1,
    },
    selectedThumbnail: {
        borderColor: Colors.snow,
        opacity: 1,
    },
    buttons: {
        flexDirection: "row",
        gap: 10,
        marginTop: 20,
        width: "100%",
    },
    button: {
        marginHorizontal: 0,
        flex: 1,
    },
});
