import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StyleSheet, View, Switch } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { Colors } from "@/constants/Colors";
import { MusicPreference } from "@/types/types";

export default function MusicScreen() {
    const [playMusic, setPlayMusic] = useState<MusicPreference>("no");

    useEffect(() => {
        const getMusicPreference = async (): Promise<void> => {
            const musicPref = await AsyncStorage.getItem("playMusic");
            if (musicPref === "yes" || musicPref === "no") {
                setPlayMusic(musicPref as MusicPreference);
            } else {
                setPlayMusic("no");
            }
        };
        getMusicPreference();
    }, []);

    const handleMusicPreference = async (
        preference: MusicPreference
    ): Promise<void> => {
        try {
            await AsyncStorage.setItem("playMusic", preference ?? "no");
            setPlayMusic(preference);
        } catch (error) {
            console.error("Error setting music preference", error);
        }
    };

    const toggleSwitch = (value: boolean) => {
        handleMusicPreference(value ? "yes" : "no");
    };

    return (
        <View style={styles.musicContainer}>
            <ThemedText
                type="sectionText"
                style={{ fontFamily: "PoppinsBold" }}
            >
                {playMusic === "yes"
                    ? "Le fond musical est activé."
                    : "Le fond musical est désactivé."}
            </ThemedText>
            <ThemedText type="sectionText">
                {playMusic === "yes"
                    ? "La musique se déclenchera automatiquement lorsque vous ouvrez l'application mais vous pourrez la mettre en pause depuis l'onglet Décompte."
                    : "La musique ne se déclenchera pas lorsque vous ouvrez l'app mais vous pourrez tout de même lancer la musique depuis l'onglet Décompte."}
            </ThemedText>

            <View style={styles.separator} />

            <View style={styles.row}>
                <ThemedText type="sectionText" style={{ color: Colors.green }}>
                    {playMusic === "yes"
                        ? "Désactiver l'ambiance musicale"
                        : "Activer l'ambiance musicale"}
                </ThemedText>

                <Switch
                    value={playMusic === "yes"}
                    onValueChange={toggleSwitch}
                    trackColor={{ false: "#ccc", true: Colors.green }}
                    thumbColor="#fff"
                    style={{ transform: [{ scaleX: 1.3 }, { scaleY: 1.3 }] }}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    musicContainer: {
        padding: 20,
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    separator: {
        height: 1,
        backgroundColor: "#ccc",
        marginTop: 24,
        marginBottom: 16,
    },
});
