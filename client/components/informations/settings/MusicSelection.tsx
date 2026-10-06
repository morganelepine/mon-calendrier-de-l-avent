import { useCallback, useEffect, useState } from "react";
import { Pressable, StyleSheet, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect } from "expo-router";
import { useAudioPlayer, useAudioPlayerStatus } from "expo-audio";
import { ThemedText } from "@/components/ThemedText";
import {
    PremiumFeatureCard,
    PremiumFeaturePanel,
} from "@/components/informations/settings/PremiumFeatureCard";
import { Colors, Theme } from "@/constants/Colors";
import { currentMusicSeason, getSeasonMusics } from "@/constants/Musics";
import { usePremium } from "@/contexts/PremiumContext";
import { useMusicSelection } from "@/contexts/MusicSelectionContext";

export const MusicSelection = ({ color }: { color: string }) => {
    const { isPremium } = usePremium();
    const { excludedIds, setExcludedIds } = useMusicSelection();
    const musics = getSeasonMusics(currentMusicSeason);
    const [showMusics, setShowMusics] = useState(false);

    // A single preview player shared by every row, so two tracks never overlap.
    const [previewId, setPreviewId] = useState<string | null>(null);
    const previewMusic = musics.find((music) => music.id === previewId);
    const player = useAudioPlayer(
        previewMusic ? { uri: previewMusic.url } : null,
    );
    const { didJustFinish } = useAudioPlayerStatus(player);

    useEffect(() => {
        if (previewMusic) player.play();
    }, [player, previewMusic]);

    useEffect(() => {
        if (didJustFinish) setPreviewId(null);
    }, [didJustFinish]);

    // Stop the preview when leaving the screen.
    useFocusEffect(useCallback(() => () => setPreviewId(null), []));

    const togglePreview = (id: string) =>
        setPreviewId((current) => (current === id ? null : id));

    // Free users can't choose: they get every free track and no premium one.
    const isChecked = (id: string, premium: boolean) =>
        isPremium ? !excludedIds.includes(id) : !premium;
    const checkedCount = musics.filter((music) =>
        isChecked(music.id, music.premium),
    ).length;

    const toggle = (id: string) => {
        if (!excludedIds.includes(id)) {
            // Keep at least one track checked.
            if (checkedCount <= 1) return;
            setExcludedIds([...excludedIds, id]);
        } else {
            setExcludedIds(excludedIds.filter((excluded) => excluded !== id));
        }
    };

    return (
        <PremiumFeatureCard
            title="Encore plus de musique"
            color={color}
            description="Découvrez X nouvelles musiques de Noël et choisissez celles qui vous accompagneront tout au long du mois."
        >
            <TouchableOpacity
                style={styles.toggleButton}
                onPress={() => {
                    setShowMusics((prev) => !prev);
                    setPreviewId(null);
                }}
            >
                <ThemedText style={styles.toggleButtonText}>
                    {showMusics
                        ? "Masquer les musiques"
                        : "Choisir les musiques"}
                </ThemedText>
                <Ionicons
                    name={showMusics ? "chevron-up" : "chevron-down"}
                    size={18}
                    color={Colors.snow}
                />
            </TouchableOpacity>

            {showMusics && (
                <PremiumFeaturePanel>
                    <View>
                        {musics.map(({ id, title, premium }) => {
                            const checked = isChecked(id, premium);
                            const isPreviewing = previewId === id;
                            return (
                                <View key={id} style={styles.row}>
                                    <TouchableOpacity
                                        disabled={!isPremium}
                                        onPress={() => toggle(id)}
                                        style={[
                                            styles.rowChoice,
                                            !isPremium && styles.disabled,
                                        ]}
                                    >
                                        <Ionicons
                                            name={
                                                checked
                                                    ? "checkbox"
                                                    : "square-outline"
                                            }
                                            size={24}
                                            color={Theme.orangeToBlue}
                                        />
                                        <ThemedText
                                            type="sectionText"
                                            style={styles.rowLabel}
                                        >
                                            {title}
                                        </ThemedText>
                                        {premium && !isPremium && (
                                            <Ionicons
                                                name="star"
                                                size={14}
                                                color={Colors.gold}
                                            />
                                        )}
                                    </TouchableOpacity>
                                    {/* Previewing stays available to everyone, even locked tracks. */}
                                    <Pressable
                                        onPress={() => togglePreview(id)}
                                        hitSlop={8}
                                        accessibilityLabel={
                                            isPreviewing
                                                ? `Mettre en pause ${title}`
                                                : `Écouter ${title}`
                                        }
                                    >
                                        <Ionicons
                                            name={
                                                isPreviewing
                                                    ? "pause-circle"
                                                    : "play-circle"
                                            }
                                            size={30}
                                            color={Theme.orangeToBlue}
                                        />
                                    </Pressable>
                                </View>
                            );
                        })}
                    </View>
                </PremiumFeaturePanel>
            )}
        </PremiumFeatureCard>
    );
};

const styles = StyleSheet.create({
    toggleButton: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 20,
        paddingTop: 8,
        gap: 12,
    },
    toggleButtonText: {
        fontSize: 14,
        fontFamily: "PoppinsBold",
        color: Colors.snow,
    },
    disabled: {
        opacity: 0.6,
    },
    row: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
        paddingHorizontal: 20,
        paddingVertical: 4,
    },
    rowChoice: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
    },
    rowLabel: {
        flexShrink: 1,
        paddingHorizontal: 0,
        paddingBottom: 0,
        color: Theme.orangeToBlue,
    },
});
