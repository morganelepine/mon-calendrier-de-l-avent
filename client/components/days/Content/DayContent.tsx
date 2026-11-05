import { useRef } from "react";
import { StyleSheet, View } from "react-native";
import { NoContent } from "@/components/days/Content/NoContent";
import { ContentButton } from "@/components/content/ContentButton";
import { getCloudinaryImageUrl } from "@/services/cloudinary.service";
import { ContentType } from "@/enums/enums";
import { useDayContents } from "@/hooks/useDayContents";

type DayContentProps = {
    dayId: number;
    onImagesReady?: () => void;
};

export const DayContent = ({ dayId, onImagesReady }: DayContentProps) => {
    const { contents, hasError, reload } = useDayContents(dayId);
    const loadedImages = useRef(0);

    if (hasError) {
        return <NoContent loadContents={reload} />;
    }

    const { anecdote, story, ideas = [], games = [] } = contents ?? {};

    const expectedImages = [
        story,
        ideas.length > 0,
        anecdote,
        games.length > 0,
    ].filter(Boolean).length;

    const onImageLoaded = (): void => {
        loadedImages.current += 1;
        if (loadedImages.current === expectedImages) onImagesReady?.();
    };

    return (
        <View style={styles.contentsContainer}>
            <View style={styles.contentContainer}>
                {story && (
                    <ContentButton
                        content={story}
                        dayId={dayId}
                        onImageLoaded={onImageLoaded}
                        backgroundImage={getCloudinaryImageUrl(
                            "s-instruire_xybqas",
                        )}
                        contentType={ContentType.Story}
                        contentNumber={1}
                    />
                )}
            </View>

            <View style={styles.contentContainer}>
                {ideas.length > 0 && (
                    <ContentButton
                        ideas={ideas}
                        dayId={dayId}
                        onImageLoaded={onImageLoaded}
                        backgroundImage={getCloudinaryImageUrl(
                            "se-regaler_mnonwh",
                        )}
                        contentType={ContentType.Idea}
                        contentNumber={2}
                    />
                )}
            </View>

            <View style={styles.contentContainer}>
                {anecdote && (
                    <ContentButton
                        content={anecdote}
                        dayId={dayId}
                        onImageLoaded={onImageLoaded}
                        backgroundImage={getCloudinaryImageUrl("kiwi1_r7kihz")}
                        contentType={ContentType.Anecdote}
                        contentNumber={3}
                    />
                )}
            </View>

            <View style={styles.contentContainer}>
                {games.length > 0 && (
                    <ContentButton
                        games={games}
                        dayId={dayId}
                        onImageLoaded={onImageLoaded}
                        backgroundImage={getCloudinaryImageUrl(
                            "christmas_a5bsoi",
                        )}
                        contentType={ContentType.Game}
                        contentNumber={4}
                    />
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    contentsContainer: {
        flexGrow: 1,
        gap: 5,
    },
    contentContainer: {
        flexGrow: 1,
    },
});
