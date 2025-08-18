import React, { useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { StyleSheet, Pressable, View, Image } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ExternalLink } from "@/components/utils/ExternalLink";
import { CustomModal } from "@/components/utils/custom/CustomModal";
import { CloseModalButton } from "@/components/utils/buttons/CloseModalButton";
import { Colors } from "@/constants/Colors";
import Ionicons from "@expo/vector-icons/Ionicons";

import { getCloudinaryImageUrl } from "@/services/cloudinary";

export const Poem = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const insets = useSafeAreaInsets();

    return (
        <>
            <View style={styles.imageContainer}>
                <Pressable onPress={() => setModalVisible(true)}>
                    <View
                        style={[
                            styles.thumbnail,
                            { marginRight: 10, marginBottom: 15 },
                        ]}
                    >
                        <Image
                            source={{
                                uri: getCloudinaryImageUrl("poeme_bjmaqy"),
                            }}
                            resizeMode="cover"
                            style={styles.thumbnail}
                        />
                    </View>
                </Pressable>

                <ThemedText type="sectionText" style={styles.explanations}>
                    Cliquez sur l'image pour la télécharger ou récupérer le
                    texte !
                </ThemedText>
            </View>

            <CustomModal
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <CloseModalButton
                    onPress={() => setModalVisible(false)}
                    style={{ backgroundColor: Colors.green, opacity: 1 }}
                >
                    <Ionicons
                        name={"close-outline"}
                        size={35}
                        color={Colors.snow}
                    />
                </CloseModalButton>
                <View
                    style={[styles.modalContainer, { marginTop: insets.top }]}
                >
                    <View>
                        <View style={styles.section}>
                            <ThemedText style={styles.title}>
                                La nouvelle année
                            </ThemedText>
                        </View>

                        <View style={styles.section}>
                            <ThemedText style={styles.sectionText}>
                                Comme une sempiternelle ritournelle
                            </ThemedText>
                            <ThemedText style={styles.sectionText}>
                                Les résolutions s’enchaînent
                            </ThemedText>
                            <ThemedText style={styles.sectionText}>
                                Pour tenter de briser nos peines
                            </ThemedText>
                            <ThemedText style={styles.sectionText}>
                                Dans l’espoir qu’elle soit encore plus belle
                            </ThemedText>
                        </View>

                        <View style={styles.section}>
                            <ThemedText style={styles.sectionText}>
                                Comme une sempiternelle ritournelle
                            </ThemedText>
                            <ThemedText style={styles.sectionText}>
                                Cette nuit d’ivresse
                            </ThemedText>
                            <ThemedText style={styles.sectionText}>
                                Sera remplie de belles promesses
                            </ThemedText>
                            <ThemedText style={styles.sectionText}>
                                Dans l’espoir qu’elle soit encore plus belle
                            </ThemedText>
                        </View>

                        <View style={styles.section}>
                            <ThemedText style={styles.sectionText}>
                                Comme une sempiternelle ritournelle
                            </ThemedText>
                            <ThemedText style={styles.sectionText}>
                                On va faire la fête
                            </ThemedText>
                            <ThemedText style={styles.sectionText}>
                                Les rêves pleins la tête
                            </ThemedText>
                            <ThemedText style={styles.sectionText}>
                                Dans l’espoir qu’elle soit encore plus belle
                            </ThemedText>
                        </View>
                    </View>

                    <ExternalLink
                        href={"https://bit.ly/poeme-arthur"}
                        style={styles.button}
                    >
                        <ThemedText style={styles.buttonText}>
                            Télécharger l'image
                        </ThemedText>
                    </ExternalLink>
                    <ExternalLink
                        href={
                            "https://www.canva.com/design/DAGX8HUEHSw/a0MKdZA7B1Jzl2iP_s871g/view?utm_content=DAGX8HUEHSw&utm_campaign=designshare&utm_medium=link&utm_source=editor"
                        }
                        style={styles.button}
                    >
                        <ThemedText style={styles.buttonText}>
                            Récupérer le texte
                        </ThemedText>
                    </ExternalLink>

                    <ExternalLink href={"https://bit.ly/poeme-arthur"}>
                        <View style={styles.thumbnail}>
                            <Image
                                source={{
                                    uri: getCloudinaryImageUrl("poeme_bjmaqy"),
                                }}
                                resizeMode="cover"
                                style={styles.thumbnail}
                            />
                        </View>
                    </ExternalLink>
                </View>
            </CustomModal>
        </>
    );
};

const styles = StyleSheet.create({
    imageContainer: { flexDirection: "row", marginVertical: 10 },
    explanations: {
        fontSize: 14,
        marginTop: 5,
        fontFamily: "PoppinsItalic",
        flex: 1,
    },
    modalContainer: {
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
    },
    section: {
        marginBottom: 10,
    },
    title: {
        color: Colors.red,
        fontSize: 20,
        fontFamily: "PallyBold",
        textAlign: "left",
        letterSpacing: 2,
    },
    sectionText: {
        fontSize: 14,
        fontFamily: "Poppins",
        textAlign: "left",
        color: Colors.darkGreen,
    },
    thumbnail: {
        width: 150,
        height: 210,
        borderRadius: 5,
        marginBottom: 15,
    },
    button: {
        backgroundColor: Colors.red,
        borderRadius: 50,
        paddingHorizontal: 20,
        marginBottom: 10,
        height: 48,
        textAlign: "center",
    },
    buttonText: {
        color: "white",
        lineHeight: 48,
        fontSize: 14,
    },
});
