import { useCallback, useEffect, useState } from "react";
import { StyleSheet, Image } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "expo-router";
import ParallaxScrollView from "@/components/utils/ParallaxScrollView";
import { Collapsible } from "@/components/utils/Collapsible";
import { ThemedText } from "@/components/ThemedText";
import { AppContent } from "@/components/informations/AppContent";
import { MusicPref } from "@/components/informations/MusicPref";
import { Copyrights } from "@/components/informations/Copyrights";
import { RateApp } from "@/components/informations/RateApp";
import { BingoRules } from "@/components/bingo/BingoRules";
import { Rules } from "@/components/score/Rules";
import { Colors } from "@/constants/Colors";
import { MusicPreference } from "@/types/types";
import { getCloudinaryImageUrl } from "@/services/cloudinary";

export default function InformationsScreen() {
    const [playMusic, setPlayMusic] = useState<MusicPreference>(null);
    const [visible, setVisible] = useState<boolean>(true);

    useEffect(() => {
        const getMusicPreference = async (): Promise<void> => {
            const musicPref = await AsyncStorage.getItem("playMusic");
            setPlayMusic(musicPref as MusicPreference);
        };
        getMusicPreference();
    }, []);

    const handleMusicPreference = async (
        preference: MusicPreference
    ): Promise<void> => {
        if (preference) {
            try {
                await AsyncStorage.setItem("playMusic", preference);
                setPlayMusic(preference);
                setVisible(false);
            } catch (error) {
                console.error("Error setting music preference", error);
            }
        }
    };

    useFocusEffect(
        useCallback(() => {
            return () => {
                setVisible(true);
            };
        }, [])
    );
    return (
        <ParallaxScrollView
            headerBackgroundColor={{
                light: Colors.snow,
                dark: Colors.darkGreen,
            }}
            headerImage={
                <Image
                    source={{ uri: getCloudinaryImageUrl("christmas_gssam3") }}
                    style={styles.headerImage}
                    resizeMode="cover"
                />
            }
        >
            <ThemedText type="modalTitle" style={{ color: Colors.blue }}>
                Présentation du&nbsp;calendrier
            </ThemedText>

            <Collapsible
                title={"Contenu de l'application"}
                style={styles.title}
            >
                <AppContent />
            </Collapsible>

            <Collapsible
                title={"Règles pour gagner des points"}
                style={styles.title}
            >
                <Rules />
            </Collapsible>

            <Collapsible title={"Fonctionnement du bingo"} style={styles.title}>
                <BingoRules />
            </Collapsible>

            <Collapsible title={"Gestion de la musique"} style={styles.title}>
                <MusicPref
                    visible={visible}
                    playMusic={playMusic}
                    handleMusicPreference={handleMusicPreference}
                />
            </Collapsible>

            <Collapsible title={"Noter l'application 🌟"} style={styles.title}>
                <RateApp />
            </Collapsible>

            <Collapsible title={"Remerciements"} style={styles.title}>
                <Copyrights />
            </Collapsible>
        </ParallaxScrollView>
    );
}

const styles = StyleSheet.create({
    headerImage: {
        height: "100%",
        width: "100%",
    },
    title: { color: Colors.blue, width: "90%" },
});
