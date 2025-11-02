import { useState } from "react";
import {
    ImageBackground,
    StyleSheet,
    View,
    TouchableOpacity,
    Pressable,
} from "react-native";
import { router } from "expo-router";
import { CustomSafeAreaView } from "@/components/utils/custom/CustomSafeAreaView";
import { BingoRulesModal } from "@/components/bingo/BingoRulesModal";
import { getCloudinaryImageUrl } from "@/services/cloudinary";
import { ThemedText } from "@/components/ThemedText";
import { Colors } from "@/constants/Colors";

export default function BingoScreen() {
    const [modalVisible, setModalVisible] = useState(false);

    return (
        <ImageBackground
            source={{
                uri: getCloudinaryImageUrl("blue_background_darker_d10kn5"),
            }}
            resizeMode="cover"
            style={styles.imageBackground}
        >
            <CustomSafeAreaView>
                <Pressable
                    onPress={() => setModalVisible(true)}
                    style={[styles.button, { alignSelf: "flex-end" }]}
                >
                    <ThemedText
                        type="italic14"
                        style={{
                            textDecorationLine: "underline",
                            color: Colors.snow,
                        }}
                    >
                        Comment ça marche ?
                    </ThemedText>
                </Pressable>
                <View style={{ flex: 1, justifyContent: "center" }}>
                    {/* Activités */}
                    <View style={styles.card}>
                        <ThemedText
                            style={[styles.cardTitle, { color: Colors.red }]}
                        >
                            Le bingo des activités de&nbsp;Noël
                        </ThemedText>
                        <ThemedText style={styles.cardSubtitle}>
                            Profitez au maximum de la&nbsp;magie de&nbsp;Noël
                            tout au&nbsp;long du&nbsp;mois de&nbsp;décembre
                        </ThemedText>
                        <TouchableOpacity
                            style={[
                                styles.button,
                                { backgroundColor: Colors.red },
                            ]}
                            onPress={() => router.push("/bingo/activities")}
                        >
                            <ThemedText style={styles.buttonText}>
                                Jouer
                            </ThemedText>
                        </TouchableOpacity>
                    </View>

                    {/* Téléfilms */}
                    <View style={styles.card}>
                        <ThemedText
                            style={[styles.cardTitle, { color: Colors.green }]}
                        >
                            Le bingo des téléfilms de&nbsp;Noël
                        </ThemedText>
                        <ThemedText style={styles.cardSubtitle}>
                            Repérez le plus de clichés possible devant un
                            téléfilm de&nbsp;Noël
                        </ThemedText>
                        <TouchableOpacity
                            style={[
                                styles.button,
                                { backgroundColor: Colors.green },
                            ]}
                            onPress={() => router.push("/bingo/telefilms")}
                        >
                            <ThemedText style={styles.buttonText}>
                                Jouer
                            </ThemedText>
                        </TouchableOpacity>
                    </View>
                </View>

                <BingoRulesModal
                    modalVisible={modalVisible}
                    setModalVisible={setModalVisible}
                />
            </CustomSafeAreaView>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    imageBackground: {
        flex: 1,
        width: "100%",
        height: "100%",
    },
    bingoContainer: {
        flex: 1,
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
        alignContent: "center",
        marginHorizontal: 20,
        marginBottom: 15,
    },
    card: {
        borderRadius: 16,
        paddingVertical: 20,
        paddingHorizontal: 16,
        margin: 20,
        backgroundColor: Colors.snow,
        opacity: 0.9,
        gap: 8,
    },
    cardTitle: {
        fontSize: 24,
        textAlign: "center",
        fontFamily: "PallyBold",
    },
    cardSubtitle: {
        fontSize: 14,
        textAlign: "center",
    },
    button: {
        paddingVertical: 8,
        paddingHorizontal: 24,
        borderRadius: 20,
        alignSelf: "center",
    },
    buttonText: {
        color: Colors.snow,
    },
});
