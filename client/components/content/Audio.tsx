import { useEffect, useState } from "react";
import { StyleSheet, Pressable, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAudioPlayer } from "expo-audio";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Colors } from "@/constants/Colors";
import { MusicPreference } from "@/types/types";

interface AudioPlayerProps {
    music: string;
}

export const AudioPlayer: React.FC<AudioPlayerProps> = ({ music }) => {
    const audioSource = music ? { uri: music } : null;
    const player = useAudioPlayer(audioSource);

    const [isPlaying, setIsPlaying] = useState(false);
    const [playMusic, setPlayMusic] = useState<MusicPreference>(null);

    const togglePlayPause = () => {
        if (!player) return;

        if (isPlaying) {
            player.pause();
            setIsPlaying(false);
        } else {
            player.play();
            setIsPlaying(true);
        }
    };

    useEffect(() => {
        const getMusicPreference = async (): Promise<void> => {
            try {
                const musicPref = await AsyncStorage.getItem("playMusic");
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
            setIsPlaying(true);
        }
        return () => {
            // if (player) {
            //     player.remove();
            // }
        };
    }, [playMusic, player]);

    return (
        <Pressable onPress={togglePlayPause} style={styles.button}>
            <View style={styles.buttonBackground} />
            <Ionicons
                name={isPlaying ? "pause" : "play"}
                size={26}
                color={Colors.blue}
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
