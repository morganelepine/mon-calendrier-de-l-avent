import { useEffect, useRef, useState } from "react";
import { router } from "expo-router";
import { StyleSheet, View, ImageBackground, ScrollView } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { EdgeInsets } from "react-native-safe-area-context";
import { ThemedText } from "@/components/ThemedText";
import { AppContent } from "@/components/informations/AppContent";
import { MusicPreferences } from "@/components/calendar/MusicPreferences";
import { CustomModal } from "@/components/utils/custom/CustomModal";
import { CustomButton } from "@/components/utils/buttons/Button";
import { Colors } from "@/constants/Colors";
import { getCloudinaryImageUrl } from "@/services/cloudinary";

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
    const backgroundImage = getCloudinaryImageUrl("Fond_1_s84lam");

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

    const handleStart = () => {
        setModalVisible(false);
        router.push({
            pathname: "/",
        });
    };

    return (
        <CustomModal
            visible={modalVisible}
            onRequestClose={() => {
                setModalVisible(false);
            }}
        >
            <ImageBackground
                source={{ uri: backgroundImage }}
                resizeMode="cover"
                style={styles.imageBackground}
            >
                <View style={styles.modalView}>
                    <ThemedText
                        type="modalTitle"
                        style={[
                            styles.modalTitle,
                            { paddingTop: insets.top + 15 },
                        ]}
                    >
                        Bienvenue dans votre&nbsp;calendrier de&nbsp;l'avent
                    </ThemedText>
                    <ScrollView
                        ref={scrollViewRef}
                        style={{ paddingHorizontal: 20 }}
                        // persistentScrollbar={true} // Android only
                    >
                        <AppContent />

                        <MusicPreferences
                            setPlayMusic={setPlayMusic}
                            firstLaunch={true}
                        />

                        <CustomButton
                            onPress={handleStart}
                            style={styles.button}
                        >
                            Commencer l'aventure 🚀
                        </CustomButton>
                    </ScrollView>
                </View>
            </ImageBackground>
        </CustomModal>
    );
};

const styles = StyleSheet.create({
    imageBackground: {
        flex: 1,
    },
    modalView: {
        flex: 1,
        alignItems: "center",
    },
    modalTitle: { paddingHorizontal: 15, color: Colors.blue },
    button: { marginBottom: 30, backgroundColor: Colors.blue },
});
