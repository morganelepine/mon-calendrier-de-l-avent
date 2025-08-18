import { StyleSheet, View } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { CustomButton } from "@/components/utils/buttons/Button";
import { Colors } from "@/constants/Colors";
import { MusicPreference } from "@/types/types";

interface MusicPrefProps {
    visible: boolean;
    playMusic: string | null;
    handleMusicPreference: (preference: MusicPreference) => Promise<void>;
}

export const MusicPref: React.FC<MusicPrefProps> = ({
    visible,
    playMusic,
    handleMusicPreference,
}) => {
    return (
        <View style={styles.musicContainer}>
            {visible ? (
                playMusic === "yes" ? (
                    <>
                        <ThemedText type="sectionText">
                            Le fond musical est actuellement activé dans
                            l'application. Souhaitez-vous le désactiver ?
                        </ThemedText>
                        <ThemedText style={styles.textExplaination}>
                            La musique ne se déclenchera plus lorsque vous
                            ouvrirez l'app mais vous pourrez toujours l'activer
                            dans l'onglet "Décompte".
                        </ThemedText>
                        <CustomButton
                            onPress={() => {
                                handleMusicPreference("no");
                            }}
                            style={styles.button}
                        >
                            Désactiver
                        </CustomButton>
                    </>
                ) : (
                    <>
                        <ThemedText type="sectionText">
                            Le fond musical est actuellement désactivé dans
                            l'application. Souhaitez-vous l'activer ?
                        </ThemedText>
                        <ThemedText style={styles.textExplaination}>
                            La musique se déclenchera lorsque vous ouvrez l'app,
                            mais vous pourrez l'arrêter à tout moment dans
                            l'onglet "Décompte".
                        </ThemedText>
                        <CustomButton
                            onPress={() => {
                                handleMusicPreference("yes");
                            }}
                            style={styles.button}
                        >
                            Activer
                        </CustomButton>
                    </>
                )
            ) : (
                <ThemedText type="sectionText" style={styles.confirmation}>
                    Votre préférence a bien été prise en compte. Vous pourrez la
                    modifier plus tard si besoin.
                </ThemedText>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    musicContainer: {
        marginBottom: 30,
    },
    button: {
        backgroundColor: Colors.red,
        alignSelf: "flex-start",
    },
    textExplaination: {
        fontSize: 12,
        flexShrink: 1,
        marginTop: 10,
        marginBottom: 15,
        textAlign: "left",
    },
    confirmation: {
        fontFamily: "PoppinsItalic",
        color: Colors.blue,
        textAlign: "left",
    },
});
