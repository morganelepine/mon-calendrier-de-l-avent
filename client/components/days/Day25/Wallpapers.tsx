import React, { useState } from "react";
import { StyleSheet, Pressable, View, Dimensions } from "react-native";
import { Image } from "expo-image";
import { CenteredModal } from "@/components/utils/custom/CenteredModal";
import { getCloudinaryImageUrl } from "@/services/cloudinary.service";
import { ThemedText } from "@/components/ThemedText";
import { Colors } from "@/constants/Colors";
import { WallpaperData } from "@/interfaces/contentInterface";

interface WallpapersProps {
    datas: WallpaperData[];
    type: string;
}

export const Wallpapers = ({ datas, type }: WallpapersProps) => {
    const { width, height } = Dimensions.get("window");
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    return (
        <>
            <View style={styles.gallery}>
                {datas.map((data) =>
                    type === "wallpapers" ? (
                        <Pressable
                            key={data.id}
                            onPress={() => setSelectedImage(data.image)}
                        >
                            <Image
                                source={{
                                    uri: getCloudinaryImageUrl(data.image),
                                }}
                                contentFit="cover"
                                cachePolicy="memory-disk"
                                style={styles.thumbnail}
                            />
                        </Pressable>
                    ) : (
                        <Pressable
                            key={data.id}
                            onPress={() => setSelectedImage(data.image)}
                            style={styles.button}
                        >
                            <ThemedText
                                style={{ fontSize: 14, textAlign: "center" }}
                            >
                                {data.title}
                            </ThemedText>
                        </Pressable>
                    )
                )}
            </View>

            <CenteredModal
                visible={!!selectedImage}
                onRequestClose={() => setSelectedImage(null)}
                overlayOpacity={0.8}
                contentStyle={styles.imageModalContent}
            >
                <Pressable onPress={() => setSelectedImage(null)}>
                    {selectedImage && (
                        <Image
                            source={{
                                uri: getCloudinaryImageUrl(selectedImage),
                            }}
                            contentFit="contain"
                            cachePolicy="memory-disk"
                            style={{
                                height: height,
                                width: width,
                            }}
                        />
                    )}
                </Pressable>
            </CenteredModal>
        </>
    );
};

const styles = StyleSheet.create({
    imageModalContent: {
        margin: 0,
        backgroundColor: "transparent",
        borderRadius: 0,
    },
    gallery: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-around",
        paddingVertical: 10,
        paddingHorizontal: 20,
    },
    thumbnail: {
        width: 45,
        height: 80,
        borderRadius: 5,
        margin: 2,
    },
    button: {
        width: "45%",
        margin: 4,
        borderRadius: 50,
        paddingVertical: 2,
        paddingHorizontal: 8,
        borderWidth: 1,
        borderColor: Colors.red,
        alignSelf: "center",
    },
});
