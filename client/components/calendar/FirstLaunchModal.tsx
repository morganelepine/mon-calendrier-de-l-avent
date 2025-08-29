import { useEffect, useRef, useState } from "react";
import { router } from "expo-router";
import { StyleSheet, View, ScrollView } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { EdgeInsets } from "react-native-safe-area-context";
import { ThemedText } from "@/components/ThemedText";
import { AppContent } from "@/components/informations/AppContent";
import { MusicPreferences } from "@/components/calendar/MusicPreferences";
import { CustomModal } from "@/components/utils/custom/CustomModal";
import { CustomButton } from "@/components/utils/buttons/Button";
import { Colors } from "@/constants/Colors";

interface FirstLaunchModalProps {
    modalVisible: boolean;
    setModalVisible: (modalVisible: boolean) => void;
    insets: EdgeInsets;
}

type MusicPreference = "yes" | "no" | null;

export const FirstLaunchModal: React.FC<FirstLaunchModalProps> = ({
    modalVisible,
    setModalVisible,
    insets,
}) => {
    const scrollViewRef = useRef<ScrollView>(null);
    const [playMusic, setPlayMusic] = useState<MusicPreference>(null);

    useEffect(() => {
        const setMusicPreference = async (
            preference: MusicPreference
        ): Promise<void> => {
            if (preference) {
                try {
                    await AsyncStorage.setItem("playMusic", preference);
                } catch (error) {
                    console.error("Error saving music preference", error);
                }
            }
        };
        setMusicPreference(playMusic);
    }, [playMusic]);

    const handleStart = async () => {
        setModalVisible(false);
        await AsyncStorage.setItem("hasLaunched", "true");
        router.replace({
            pathname: "/",
        });
    };

    const onClose = async () => {
        setModalVisible(false);
        await AsyncStorage.setItem("hasLaunched", "true");
        await AsyncStorage.setItem("newUsername", "true");
    };

    return (
        <CustomModal visible={modalVisible} onRequestClose={onClose}>
            <View style={styles.container}>
                <ThemedText
                    type="pallyBoldBlue"
                    style={[styles.title, { paddingTop: insets.top }]}
                >
                    Bienvenue dans votre&nbsp;calendrier de&nbsp;l'avent
                </ThemedText>
                <ScrollView
                    ref={scrollViewRef}
                    persistentScrollbar={true} // Android only
                >
                    <AppContent />

                    <MusicPreferences
                        setPlayMusic={setPlayMusic}
                        firstLaunch={true}
                    />

                    <CustomButton onPress={handleStart} style={styles.button}>
                        Commencer l'aventure 🚀
                    </CustomButton>
                </ScrollView>
            </View>
        </CustomModal>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        backgroundColor: Colors.snow,
    },
    title: {
        margin: 15,
        fontSize: 34,
        textAlign: "center",
    },
    button: {
        marginHorizontal: 20,
        marginBottom: 30,
        backgroundColor: Colors.blue,
    },
});
