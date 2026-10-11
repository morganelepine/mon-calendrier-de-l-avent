import { useCallback } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { router } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import YoutubePlayer, { PLAYER_STATES } from "react-native-youtube-iframe";
import { Colors } from "@/constants/Colors";
import { useDailySong } from "@/contexts/DailySongContext";

// react-navigation's default bottom tab bar height (without the safe area).
const TAB_BAR_HEIGHT = 49;
const MINI_WIDTH = 200;
const MINI_HEIGHT = Math.round((MINI_WIDTH * 9) / 16);

// Mounted once at the root, next to the navigator: the same WebView is only
// resized/moved between the daily song screen and the floating mini-player,
// never unmounted, so the music survives navigation.
export const DailySongPlayer = () => {
    const {
        song,
        playing,
        isExpanded,
        slotLayout,
        hostRef,
        setPlaying,
        close,
    } = useDailySong();
    const insets = useSafeAreaInsets();

    const onChangeState = useCallback(
        (state: PLAYER_STATES) => {
            if (state === PLAYER_STATES.PLAYING) setPlaying(true);
            if (
                state === PLAYER_STATES.PAUSED ||
                state === PLAYER_STATES.ENDED
            ) {
                setPlaying(false);
            }
        },
        [setPlaying],
    );

    // The host stays mounted even without a song so the screen can always
    // measure its slot against it.
    if (!song) {
        return (
            <View
                ref={hostRef}
                pointerEvents="none"
                style={StyleSheet.absoluteFill}
            />
        );
    }

    const expanded = isExpanded && slotLayout !== null;
    const width = expanded ? slotLayout.width : MINI_WIDTH;
    const height = expanded ? slotLayout.height : MINI_HEIGHT;

    return (
        <View
            ref={hostRef}
            pointerEvents="box-none"
            style={StyleSheet.absoluteFill}
        >
            <View
                pointerEvents="box-none"
                style={
                    expanded
                        ? {
                              position: "absolute",
                              left: slotLayout.x,
                              top: slotLayout.y,
                              width,
                              height,
                          }
                        : [
                              styles.mini,
                              { bottom: insets.bottom + TAB_BAR_HEIGHT + 12 },
                          ]
                }
            >
                <YoutubePlayer
                    width={width}
                    height={height}
                    videoId={song.videoId}
                    play={playing}
                    onChangeState={onChangeState}
                />
                {!expanded ? (
                    <View style={styles.controls}>
                        <Pressable
                            onPress={() => router.push("/bingo/daily-song")}
                            style={styles.controlButton}
                            accessibilityLabel="Ouvrir la chanson du jour"
                        >
                            <Ionicons
                                name="expand"
                                size={22}
                                color={Colors.blue}
                            />
                        </Pressable>
                        <Pressable
                            onPress={close}
                            style={styles.controlButton}
                            accessibilityLabel="Fermer le lecteur"
                        >
                            <Ionicons
                                name="close"
                                size={22}
                                color={Colors.blue}
                            />
                        </Pressable>
                    </View>
                ) : null}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    mini: {
        position: "absolute",
        right: 12,
        width: MINI_WIDTH,
        borderRadius: 12,
        overflow: "hidden",
        backgroundColor: Colors.snow,
        elevation: 6,
        shadowColor: Colors.darkBlue,
    },
    controls: {
        flexDirection: "row",
        justifyContent: "space-around",
    },
    controlButton: {
        padding: 6,
    },
});
