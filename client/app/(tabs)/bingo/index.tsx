import {
    ImageBackground,
    StyleSheet,
    View,
    TouchableOpacity,
} from "react-native";
import { router } from "expo-router";
import { CustomSafeAreaView } from "@/components/utils/custom/CustomSafeAreaView";
import { getCloudinaryImageUrl } from "@/services/cloudinary";
import { ThemedText } from "@/components/ThemedText";
import { Colors } from "@/constants/Colors";

export default function BingoScreen() {
    return (
        <ImageBackground
            source={{
                uri: getCloudinaryImageUrl("blue_background_darker_d10kn5"),
            }}
            resizeMode="cover"
            style={styles.imageBackground}
        >
            <CustomSafeAreaView>
                {/* Téléfilms */}
                <View style={[styles.card, { borderColor: Colors.green }]}>
                    <ThemedText
                        style={[styles.cardTitle, { color: Colors.green }]}
                    >
                        Le bingo des téléfilms de Noël
                    </ThemedText>
                    <ThemedText style={styles.cardSubtitle}>
                        Quand : devant un téléfilm de Noël
                    </ThemedText>
                    <ThemedText style={styles.cardSubtitle}>
                        But : repérer le plus de clichés possible
                    </ThemedText>
                    <TouchableOpacity
                        style={[
                            styles.button,
                            { backgroundColor: Colors.green },
                        ]}
                        onPress={() => router.push("/bingo/telefilms")}
                    >
                        <ThemedText style={styles.buttonText}>Jouer</ThemedText>
                    </TouchableOpacity>
                </View>

                {/* Activités */}
                <View style={[styles.card, { borderColor: Colors.red }]}>
                    <ThemedText
                        style={[styles.cardTitle, { color: Colors.red }]}
                    >
                        Le bingo des activités de Noël
                    </ThemedText>
                    <ThemedText style={styles.cardSubtitle}>
                        Quand : tout au long du mois de décembre
                    </ThemedText>
                    <ThemedText style={styles.cardSubtitle}>
                        But : profiter au maximum de la magie de Noël
                    </ThemedText>
                    <TouchableOpacity
                        style={[styles.button, { backgroundColor: Colors.red }]}
                        onPress={() => router.push("/bingo/activities")}
                    >
                        <ThemedText style={styles.buttonText}>Jouer</ThemedText>
                    </TouchableOpacity>
                </View>
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
        borderWidth: 6,
    },
    cardTitle: {
        fontSize: 20,
        textAlign: "center",
        fontFamily: "PallyBold",
    },
    cardSubtitle: {
        fontSize: 14,
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
