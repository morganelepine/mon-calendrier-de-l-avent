import { useEffect, useState } from "react";
import { StyleSheet, View, Switch } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ThemedText } from "@/components/ThemedText";
import { HalloweenMusicsCredits } from "@/components/informations/HalloweenMusicsCredits";
import { Colors, Theme } from "@/constants/Colors";
import { isOctober } from "@/constants/Dates";
import { MusicPreference } from "@/types/types";
import { StorageKeys } from "@/constants/storageKeys";

export default function MusicScreen() {
    const [playMusic, setPlayMusic] = useState<MusicPreference>("no");

    useEffect(() => {
        const getMusicPreference = async (): Promise<void> => {
            const musicPref = await AsyncStorage.getItem(StorageKeys.playMusic);
            if (musicPref === "yes" || musicPref === "no") {
                setPlayMusic(musicPref as MusicPreference);
            } else {
                setPlayMusic("no");
            }
        };
        getMusicPreference();
    }, []);

    const handleMusicPreference = async (
        preference: MusicPreference,
    ): Promise<void> => {
        try {
            await AsyncStorage.setItem(
                StorageKeys.playMusic,
                preference ?? "no",
            );
            setPlayMusic(preference);
        } catch (error) {
            console.error("Error setting music preference", error);
        }
    };

    const toggleSwitch = (value: boolean) => {
        handleMusicPreference(value ? "yes" : "no");
    };

    return (
        <SafeAreaView style={{ backgroundColor: Colors.snow, flex: 1 }}>
            <ThemedText
                type="sectionText"
                style={{ fontFamily: "PoppinsBold" }}
            >
                {playMusic === "yes"
                    ? "Le fond musical est activé"
                    : "Le fond musical est désactivé"}
            </ThemedText>
            <ThemedText type="sectionText">
                {playMusic === "yes"
                    ? "La musique se déclenchera automatiquement lorsque vous ouvrez l'application mais vous pourrez la mettre en pause depuis l'onglet Décompte."
                    : "La musique ne se déclenchera pas lorsque vous ouvrez l'app mais vous pourrez tout de même lancer la musique depuis l'onglet Décompte."}
            </ThemedText>

            {isOctober && <HalloweenMusicsCredits />}

            <View style={styles.separator} />
            <View style={styles.row}>
                <ThemedText type="sectionText" style={{ color: Theme.tint }}>
                    {playMusic === "yes"
                        ? "Désactiver l'ambiance musicale"
                        : "Activer l'ambiance musicale"}
                </ThemedText>

                <Switch
                    value={playMusic === "yes"}
                    onValueChange={toggleSwitch}
                    trackColor={{ false: "#ccc", true: Theme.tint }}
                    thumbColor="#fff"
                    style={{ transform: [{ scaleX: 1.3 }, { scaleY: 1.3 }] }}
                />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingRight: 20,
    },
    separator: {
        height: 1,
        backgroundColor: "#ccc",
        marginTop: 24,
        marginBottom: 16,
    },
});
