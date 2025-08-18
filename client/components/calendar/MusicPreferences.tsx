import { StyleSheet, View, Pressable } from "react-native";
import { Colors } from "@/constants/Colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import { ThemedText } from "@/components/ThemedText";
import { useState } from "react";
import { MusicPreference } from "@/types/types";

interface MusicPreferencesProps {
    setPlayMusic: (string: MusicPreference) => void;
    firstLaunch: boolean;
}

export const MusicPreferences: React.FC<MusicPreferencesProps> = ({
    setPlayMusic,
    firstLaunch,
}) => {
    const [visible, setVisible] = useState<boolean>(true);

    const handleMusicPreference = (boolean: MusicPreference): void => {
        setPlayMusic(boolean);
        setVisible(false);
    };

    return (
        <View style={styles.musicContainer}>
            <View style={styles.background} />

            {visible ? (
                <>
                    <ThemedText>
                        {firstLaunch && "Avant de commencer... "}
                        Souhaitez-vous activer un fond musical dans
                        l'application ?
                    </ThemedText>
                    <View style={styles.musicButtonsContainer}>
                        <Pressable
                            onPress={() => {
                                handleMusicPreference("yes");
                            }}
                            style={styles.button}
                        >
                            <View
                                style={[
                                    styles.buttonBackground,
                                    { backgroundColor: Colors.green },
                                ]}
                            />
                            <Ionicons
                                name={"checkmark-outline"}
                                size={30}
                                color={Colors.snow}
                            />
                        </Pressable>
                        <Pressable
                            onPress={() => {
                                handleMusicPreference("no");
                            }}
                            style={styles.button}
                        >
                            <View
                                style={[
                                    styles.buttonBackground,
                                    { backgroundColor: Colors.blue },
                                ]}
                            />
                            <Ionicons
                                name={"close-outline"}
                                size={30}
                                color={Colors.snow}
                            />
                        </Pressable>
                    </View>

                    <View style={styles.buttonsExplainationContainer}>
                        <View style={styles.buttonsExplaination}>
                            <Ionicons
                                name={"checkmark-circle-outline"}
                                size={20}
                                color={Colors.green}
                            />
                            <ThemedText style={styles.textExplaination}>
                                La musique se déclenchera lorsque vous ouvrez
                                l'app, mais vous pourrez l'arrêter à tout
                                moment.
                            </ThemedText>
                        </View>
                        <View style={styles.buttonsExplaination}>
                            <Ionicons
                                name={"close-circle-outline"}
                                size={20}
                                color={Colors.blue}
                            />
                            <ThemedText style={styles.textExplaination}>
                                La musique ne se déclenchera pas lorsque vous
                                ouvrez l'app mais vous pourrez l'activer par la
                                suite.
                            </ThemedText>
                        </View>
                    </View>
                </>
            ) : (
                <ThemedText style={styles.confirmation}>
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
        paddingHorizontal: 15,
        paddingVertical: 10,
        width: "90%",
        alignSelf: "center",
    },
    background: {
        ...StyleSheet.absoluteFillObject,
        borderWidth: 1,
        borderColor: Colors.blue,
        borderRadius: 20,
        backgroundColor: "white",
        opacity: 0.6,
    },
    musicButtonsContainer: {
        flexDirection: "row",
        justifyContent: "center",
        gap: 50,
        marginTop: 10,
    },
    button: {
        height: 48,
        width: 48,
        alignItems: "center",
        justifyContent: "center",
    },
    buttonBackground: {
        ...StyleSheet.absoluteFillObject,
        borderRadius: 50,
    },
    buttonsExplainationContainer: {
        marginTop: 20,
        gap: 5,
    },
    buttonsExplaination: {
        flexDirection: "row",
        justifyContent: "center",
        gap: 10,
    },
    textExplaination: {
        textAlign: "left",
        fontSize: 12,
        flexShrink: 1,
    },
    confirmation: {
        fontSize: 12,
        fontFamily: "PoppinsItalic",
        color: Colors.blue,
    },
});
