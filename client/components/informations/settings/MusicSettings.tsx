import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ThemedText } from "@/components/ThemedText";
import { HalloweenMusicsCredits } from "@/components/informations/settings/HalloweenMusicsCredits";
import { SettingsToggleRow } from "@/components/informations/settings/SettingsToggleRow";
import { isOctober } from "@/constants/Dates";
import { StorageKeys } from "@/constants/storageKeys";
import { MusicPreference } from "@/types/types";
import { logClient } from "@/services/log.service";

export const MusicSettings = () => {
    const [playMusic, setPlayMusic] = useState<MusicPreference>("no");

    useEffect(() => {
        AsyncStorage.getItem(StorageKeys.playMusic).then((musicPref) => {
            setPlayMusic(musicPref === "yes" ? "yes" : "no");
        });
    }, []);

    const toggleMusic = async (value: boolean) => {
        const preference: MusicPreference = value ? "yes" : "no";
        try {
            await AsyncStorage.setItem(StorageKeys.playMusic, preference);
            setPlayMusic(preference);
        } catch (error) {
            console.error("Error setting music preference", error);
            await logClient("Error setting music preference", {
                error: String(error),
            });
        }
    };

    return (
        <>
            <ThemedText
                type="sectionText"
                style={{ fontFamily: "PoppinsBold", marginTop: 12 }}
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

            <SettingsToggleRow
                label={
                    playMusic === "yes"
                        ? "Désactiver l'ambiance musicale"
                        : "Activer l'ambiance musicale"
                }
                value={playMusic === "yes"}
                onValueChange={toggleMusic}
            />

            {isOctober && <HalloweenMusicsCredits />}
        </>
    );
};
