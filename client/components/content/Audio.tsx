import { useEffect, useRef, useState } from "react";
import { StyleSheet, Pressable, View, ViewStyle } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAudioPlayer, useAudioPlayerStatus } from "expo-audio";
import Ionicons from "@expo/vector-icons/Ionicons";
import { CustomButton } from "@/components/utils/buttons/Button";
import { Colors, Theme } from "@/constants/Colors";
import { StorageKeys } from "@/constants/storageKeys";
import { MusicPreference } from "@/types/types";
import { useDailySong } from "@/contexts/DailySongContext";
import { useMusicSelection } from "@/contexts/MusicSelectionContext";

interface AudioPlayerProps {
    music: string;
    type: "button" | "icon";
    style?: ViewStyle;
}

export const AudioPlayer: React.FC<AudioPlayerProps> = ({
    music,
    type = "icon",
    style = {},
}) => {
    // No source until the track is about to play: passing it upfront makes the
    // player download it on mount, even if the user never presses play.
    const player = useAudioPlayer(null);
    const status = useAudioPlayerStatus(player);
    const loadedMusic = useRef<string | null>(null);

    const isPlaying = status.playing;
    const [playMusic, setPlayMusic] = useState<MusicPreference>(null);
    const { playing: dailySongPlaying, setPlaying: setDailySongPlaying } =
        useDailySong();
    const { previewId } = useMusicSelection();

    const play = (): void => {
        if (!music) return;
        if (loadedMusic.current !== music) {
            player.replace({ uri: music });
            loadedMusic.current = music;
        }
        player.play();
    };

    const togglePlayPause = () => {
        if (!player) return;

        if (isPlaying) {
            player.pause();
        } else {
            // If the track already reached the end, rewind before replaying
            if (
                loadedMusic.current === music &&
                (status.didJustFinish || status.currentTime >= status.duration)
            ) {
                player.seekTo(0);
            }
            setDailySongPlaying(false);
            play();
        }
    };

    // The track changed (e.g. music selection edited): stop the old one.
    useEffect(() => {
        if (loadedMusic.current && loadedMusic.current !== music) {
            player.pause();
            loadedMusic.current = null;
        }
    }, [music, player]);

    useEffect(() => {
        const getMusicPreference = async (): Promise<void> => {
            try {
                const musicPref = await AsyncStorage.getItem(
                    StorageKeys.playMusic,
                );
                setPlayMusic(musicPref as MusicPreference);
            } catch (error) {
                console.error("Error fetching music preference", error);
            }
        };
        getMusicPreference();
    }, []);

    // Never autoplay over the daily song or a preview: the user explicitly
    // started them.
    useEffect(() => {
        if (playMusic === "yes" && player && !dailySongPlaying && !previewId) {
            play();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [playMusic, music]);

    // Starting the daily song pauses this track.
    useEffect(() => {
        if (dailySongPlaying) player.pause();
    }, [dailySongPlaying, player]);

    // Same for a preview in the music selection.
    useEffect(() => {
        if (previewId) player.pause();
    }, [previewId, player]);

    return type === "icon" ? (
        <Pressable onPress={togglePlayPause} style={styles.button}>
            <View style={styles.buttonBackground} />
            <Ionicons
                name={isPlaying ? "pause" : "play"}
                size={26}
                color={Theme.orangeToBlue}
            ></Ionicons>
        </Pressable>
    ) : (
        <CustomButton onPress={togglePlayPause} style={style}>
            <Ionicons
                name={isPlaying ? "pause" : "play"}
                size={16}
                color={Colors.snow}
            ></Ionicons>
            &nbsp;
            {isPlaying ? "Mettre en pause" : "Écouter"}
        </CustomButton>
    );
};

const styles = StyleSheet.create({
    buttonBackground: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: Colors.snow,
        borderRadius: 50,
        opacity: 0.7,
    },
    button: {
        height: 42,
        width: 42,
        alignItems: "center",
        justifyContent: "center",
    },
});
