import { useCallback, useEffect, useRef } from "react";
import { StyleSheet, View } from "react-native";
import { useFocusEffect, useNavigation } from "expo-router";
import { BlueBackground } from "@/components/utils/BlueBackground";
import { ThemedText } from "@/components/ThemedText";
import { Colors } from "@/constants/Colors";
import { getTodaySong } from "@/constants/DailySongs";
import { useDailySong } from "@/contexts/DailySongContext";

export default function DailySongScreen() {
    const navigation = useNavigation();
    const {
        song,
        playing,
        start,
        close,
        setExpanded,
        setSlotLayout,
        hostRef,
    } = useDailySong();
    const slotRef = useRef<View>(null);
    // Read on blur without re-running the focus effect at each play/pause.
    const playingRef = useRef(playing);
    playingRef.current = playing;

    const todaySong = getTodaySong();
    // Show what's actually loaded in the player (it may be a song started
    // on a previous day if the app stayed open).
    const displayedSong = song ?? todaySong;

    // The player itself is rendered at the root (DailySongPlayer) and
    // positioned over this slot, so it survives leaving the screen.
    const measureSlot = useCallback(() => {
        // Both measured in window coordinates then subtracted: measureLayout
        // only works against an ancestor, which the host isn't, and the
        // window offset (Android status bar) cancels out.
        const host = hostRef.current;
        const slot = slotRef.current;
        if (!slot || !host) return;
        host.measureInWindow((hostX, hostY) => {
            slot.measureInWindow((x, y, width, height) => {
                if (width > 0 && height > 0) {
                    setSlotLayout({
                        x: x - hostX,
                        y: y - hostY,
                        width,
                        height,
                    });
                }
            });
        });
    }, [setSlotLayout, hostRef]);

    useFocusEffect(
        useCallback(() => {
            // Only on focus: this screen stays mounted in the stack while the
            // user is elsewhere, so reacting to `song` would reopen the
            // player right after the mini-player's close button.
            if (todaySong) start(todaySong);
            setExpanded(true);
            measureSlot();
            return () => {
                setExpanded(false);
                // Only keep the mini-player for a song actually playing.
                if (!playingRef.current) close();
            };
        }, [todaySong, start, close, setExpanded, measureSlot]),
    );

    // Measuring during the push animation returns a shifted position:
    // measure again once the screen has settled.
    useEffect(
        () => navigation.addListener("transitionEnd" as never, measureSlot),
        [navigation, measureSlot],
    );

    return (
        <BlueBackground>
            <View style={styles.container}>
                <View style={styles.card}>
                    {displayedSong ? (
                        <>
                            <ThemedText style={styles.title}>
                                {displayedSong.title}
                            </ThemedText>
                            {displayedSong.artist && (
                                <ThemedText style={styles.artist}>
                                    {displayedSong.artist}
                                </ThemedText>
                            )}
                        </>
                    ) : (
                        <ThemedText style={styles.artist}>
                            Revenez demain !
                        </ThemedText>
                    )}
                </View>

                <View
                    ref={slotRef}
                    onLayout={measureSlot}
                    style={styles.slot}
                />
            </View>

            <ThemedText style={styles.note}>
                La musique continue si vous naviguez dans l'app.
            </ThemedText>
        </BlueBackground>
    );
}

const styles = StyleSheet.create({
    container: {
        margin: 20,
        padding: 20,
        borderRadius: 20,
        backgroundColor: Colors.snow,
        opacity: 0.9,
    },
    card: {
        paddingHorizontal: 16,
        gap: 4,
    },
    title: {
        fontSize: 22,
        textAlign: "center",
        fontFamily: "FreightNeoBold",
        color: Colors.blue,
    },
    artist: {
        fontSize: 14,
        textAlign: "center",
    },
    slot: {
        width: "100%",
        aspectRatio: 16 / 9,
        marginTop: 12,
    },
    note: {
        fontSize: 12,
        textAlign: "center",
        color: Colors.snow,
    },
});
