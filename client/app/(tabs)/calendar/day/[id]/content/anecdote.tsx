import { StyleSheet, Text } from "react-native";
import { Href, useLocalSearchParams } from "expo-router";
import { ThemedText } from "@/components/ThemedText";
import { ModalWithText } from "@/components/utils/custom/ModalWithText";
import { CustomMarkdown } from "@/components/utils/custom/Markdown";
import { ExternalLink } from "@/components/utils/ExternalLink";
import { CustomScrollView } from "@/components/utils/custom/ScrollView";
import { Video } from "@/components/utils/custom/Video";
import { getCloudinaryImageUrl } from "@/services/cloudinary";
import { getContentsByDay } from "@/services/content.service";

export default function AnecdoteScreen() {
    const { id } = useLocalSearchParams<{ id: string }>();
    const dayId = parseInt(id, 10);

    const { anecdote } = getContentsByDay(dayId);

    return (
        <ModalWithText
            contentType={anecdote.type}
            backgroundImage={getCloudinaryImageUrl("kiwi1_r7kihz")}
        >
            <CustomScrollView>
                <ThemedText type="modalSubtitle">{anecdote.title}</ThemedText>

                <CustomMarkdown style={styles.anecdote}>
                    {anecdote.content1}
                </CustomMarkdown>

                {anecdote.content4 ? (
                    <Video videoId={anecdote.content4} />
                ) : null}

                {anecdote.content5 ? (
                    <>
                        <ThemedText style={styles.video}>
                            Et en version moins classique...
                        </ThemedText>
                        <Video videoId={anecdote.content5} />
                    </>
                ) : null}

                {anecdote.content2 ? (
                    <ExternalLink href={anecdote.content3 as Href}>
                        <ThemedText style={styles.source}>
                            Source :{" "}
                            <Text style={{ textDecorationLine: "underline" }}>
                                {anecdote.content2}
                            </Text>
                        </ThemedText>
                    </ExternalLink>
                ) : null}
            </CustomScrollView>
        </ModalWithText>
    );
}

const styles = StyleSheet.create({
    anecdote: {
        marginVertical: 20,
        textAlign: "left",
    },
    source: {
        fontSize: 12,
        fontFamily: "PoppinsItalic",
    },
    video: {
        fontSize: 14,
        fontFamily: "PoppinsItalic",
        marginVertical: 10,
    },
});
