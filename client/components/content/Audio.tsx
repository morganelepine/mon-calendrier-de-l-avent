import { useEffect, useState } from "react";
import { StyleSheet, Pressable, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAudioPlayer, useAudioPlayerStatus } from "expo-audio";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Colors, Theme } from "@/constants/Colors";
import { MusicPreference } from "@/types/types";
import { StorageKeys } from "@/constants/storageKeys";

interface AudioPlayerProps {
    music: string;
}

export const AudioPlayer: React.FC<AudioPlayerProps> = ({ music }) => {
    const audioSource = music ? { uri: music } : null;
    const player = useAudioPlayer(audioSource);
    const status = useAudioPlayerStatus(player);

    const isPlaying = status.playing;
    const [playMusic, setPlayMusic] = useState<MusicPreference>(null);

    const togglePlayPause = () => {
        if (!player) return;

        if (isPlaying) {
            player.pause();
        } else {
            // If the track already reached the end, rewind before replaying
            if (status.didJustFinish || status.currentTime >= status.duration) {
                player.seekTo(0);
            }
            player.play();
        }
    };

    useEffect(() => {
        const getMusicPreference = async (): Promise<void> => {
            try {
                const musicPref = await AsyncStorage.getItem(
                    StorageKeys.playMusic
                );
                setPlayMusic(musicPref as MusicPreference);
            } catch (error) {
                console.error("Error fetching music preference", error);
            }
        };
        getMusicPreference();
    }, []);

    useEffect(() => {
        if (playMusic === "yes" && player) {
            player.play();
        }
    }, [playMusic, player]);

    return (
        <Pressable onPress={togglePlayPause} style={styles.button}>
            <View style={styles.buttonBackground} />
            <Ionicons
                name={isPlaying ? "pause" : "play"}
                size={26}
                color={Theme.tint}
            ></Ionicons>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    buttonBackground: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: Colors.snow,
        borderRadius: 50,
        opacity: 0.8,
    },
    button: {
        height: 48,
        width: 48,
        alignItems: "center",
        justifyContent: "center",
    },
});
