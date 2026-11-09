import { useEffect, useRef } from "react";
import { StyleSheet, Pressable, View, ViewStyle } from "react-native";
import { useAudioPlayer, useAudioPlayerStatus } from "expo-audio";
import Ionicons from "@expo/vector-icons/Ionicons";
import { CustomButton } from "@/components/utils/buttons/Button";
import { Colors, Theme } from "@/constants/Colors";
import { useMusicSelection } from "@/contexts/MusicSelectionContext";
import { useMusicPreference } from "@/hooks/useMusicPreference";
import { getCachedAudioUri } from "@/services/audioCache.service";

interface AudioPlayerProps {
    music: string;
    type: "button" | "icon";
    style?: ViewStyle;
    onFinished?: () => void;
}

export const AudioPlayer: React.FC<AudioPlayerProps> = ({
    music,
    type = "icon",
    style = {},
    onFinished,
}) => {
    // No source until the track is about to play: passing it upfront makes the
    // player download it on mount, even if the user never presses play.
    const player = useAudioPlayer(null);
    const status = useAudioPlayerStatus(player);
    const loadedMusic = useRef<string | null>(null);
    // Bumped by every play/pause request, so a download that completes after
    // the user paused (or started another track) doesn't start playback.
    const playRequest = useRef(0);

    const isPlaying = status.playing;
    const [playMusic] = useMusicPreference();
    const { previewId } = useMusicSelection();

    const play = async (): Promise<void> => {
        if (!music) return;
        const request = ++playRequest.current;
        if (loadedMusic.current !== music) {
            const uri = await getCachedAudioUri(music);
            if (request !== playRequest.current) return;
            player.replace({ uri });
            loadedMusic.current = music;
        }
        player.play();
    };

    const pause = (): void => {
        playRequest.current++;
        player.pause();
    };

    const togglePlayPause = () => {
        if (!player) return;

        if (isPlaying) {
            pause();
        } else {
            // If the track already reached the end, rewind before replaying
            if (
                loadedMusic.current === music &&
                (status.didJustFinish || status.currentTime >= status.duration)
            ) {
                player.seekTo(0);
            }
            void play();
        }
    };

    // The track changed (e.g. music selection edited): stop the old one.
    useEffect(() => {
        if (loadedMusic.current && loadedMusic.current !== music) {
            pause();
            loadedMusic.current = null;
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [music]);

    // Never autoplay over a preview: the user explicitly started it.
    useEffect(() => {
        if (playMusic === "yes" && player && !previewId) {
            void play();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [playMusic, music]);

    // Starting a preview in the music selection pauses this track.
    useEffect(() => {
        if (previewId) pause();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [previewId]);

    // The native player is released on unmount: a download still in flight
    // must not call replace/play on it afterwards.
    useEffect(() => {
        return () => {
            // Intentionally the latest value: it's a counter, not a DOM node.
            // eslint-disable-next-line react-hooks/exhaustive-deps
            playRequest.current++;
        };
    }, []);

    useEffect(() => {
        if (status.didJustFinish) onFinished?.();
    }, [status.didJustFinish, onFinished]);

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
