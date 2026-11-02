import { ThemedText } from "@/components/ThemedText";
import { HalloweenMusicsCredits } from "@/components/informations/settings/HalloweenMusicsCredits";
import { SettingsToggleRow } from "@/components/informations/settings/SettingsToggleRow";
import { isOctober } from "@/constants/Dates";
import { useMusicPreference } from "@/hooks/useMusicPreference";

export const MusicSettings = () => {
    const [playMusic, setPlayMusic] = useMusicPreference();

    const toggleMusic = (value: boolean) => setPlayMusic(value ? "yes" : "no");

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
                label={"Activer l'ambiance musicale"}
                value={playMusic === "yes"}
                onValueChange={toggleMusic}
            />

            {isOctober && <HalloweenMusicsCredits />}
        </>
    );
};
