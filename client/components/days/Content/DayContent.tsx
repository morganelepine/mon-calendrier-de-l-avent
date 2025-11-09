import { StyleSheet, View } from "react-native";
import { ContentButton } from "@/components/content/ContentButton";
import { getCloudinaryImageUrl } from "@/services/cloudinary";
import { getContentsByDay } from "@/services/content.service";
import { ContentType } from "@/enums/enums";

type DayContentProps = {
    dayId: number;
};

export const DayContent = ({ dayId }: DayContentProps) => {
    const { anecdote, story, ideas, games } = getContentsByDay(dayId);

    return (
        <View style={styles.contentsContainer}>
            <View style={styles.contentContainer}>
                {story && (
                    <ContentButton
                        content={story}
                        dayId={dayId}
                        backgroundImage={getCloudinaryImageUrl(
                            "s-instruire_xybqas"
                        )}
                        contentType={ContentType.Story}
                    />
                )}
            </View>

            <View style={styles.contentContainer}>
                {ideas.length > 0 && (
                    <ContentButton
                        ideas={ideas}
                        dayId={dayId}
                        backgroundImage={getCloudinaryImageUrl(
                            "se-regaler_mnonwh"
                        )}
                        contentType={ContentType.Idea}
                    />
                )}
            </View>

            <View style={styles.contentContainer}>
                {anecdote && (
                    <ContentButton
                        content={anecdote}
                        dayId={dayId}
                        backgroundImage={getCloudinaryImageUrl("kiwi1_r7kihz")}
                        contentType={ContentType.Anecdote}
                    />
                )}
            </View>

            <View style={styles.contentContainer}>
                {games.length > 0 && (
                    <ContentButton
                        games={games}
                        dayId={dayId}
                        backgroundImage={getCloudinaryImageUrl(
                            "christmas_a5bsoi"
                        )}
                        contentType={ContentType.Game}
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
