import React, { useState } from "react";
import { StyleSheet, Pressable, View, Dimensions, Image } from "react-native";
import { CustomModal } from "@/components/utils/custom/CustomModal";
import { getCloudinaryImageUrl } from "@/services/cloudinary";
import { ThemedText } from "@/components/ThemedText";
import { Colors } from "@/constants/Colors";

export const Wallpapers = ({ datas, type }) => {
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
                                resizeMode="cover"
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

            <CustomModal
                visible={!!selectedImage}
                onRequestClose={() => setSelectedImage(null)}
            >
                <View style={styles.modalContainer}>
                    <Pressable onPress={() => setSelectedImage(null)}>
                        {selectedImage && (
                            <Image
                                source={{
                                    uri: getCloudinaryImageUrl(selectedImage),
                                }}
                                resizeMode="contain"
                                style={{
                                    height: height,
                                    width: width,
                                }}
                            />
                        )}
                    </Pressable>
                </View>
            </CustomModal>
        </>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.8)",
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
