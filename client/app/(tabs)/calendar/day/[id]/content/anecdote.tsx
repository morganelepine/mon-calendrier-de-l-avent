import { Href, useLocalSearchParams } from "expo-router";
import { View } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ContentScreenWrapper } from "@/components/utils/custom/ContentScreenWrapper";
import { CustomMarkdown } from "@/components/utils/custom/Markdown";
import { ExternalLink } from "@/components/utils/ExternalLink";
import { Video } from "@/components/utils/custom/Video";
import { getContentsByDay } from "@/services/content.service";
import { Content } from "@/interfaces/contentInterface";

export default function AnecdoteScreen() {
    const { id } = useLocalSearchParams<{ id: string }>();
    const dayId = parseInt(id, 10);

    const { anecdote } = getContentsByDay(dayId) as { anecdote: Content };

    return (
        <ContentScreenWrapper
            contentType={anecdote.type}
            backgroundImage={"kiwi1_r7kihz"}
            dayId={dayId}
        >
            <ThemedText type="contentSubtitle">{anecdote.title}</ThemedText>

            <CustomMarkdown>{anecdote.content1}</CustomMarkdown>

            {anecdote.content4 ? (
                <View style={{ marginVertical: 16 }}>
                    <Video videoId={anecdote.content4} />
                </View>
            ) : null}

            {anecdote.content2 ? (
                <ExternalLink
                    href={anecdote.content3 as Href}
                    style={{ marginTop: 10 }}
                >
                    <ThemedText type="italic14">
                        Source :{" "}
                        <ThemedText
                            type="italic14"
                            style={{ textDecorationLine: "underline" }}
                        >
                            {anecdote.content2}
                        </ThemedText>
                    </ThemedText>
                </ExternalLink>
            ) : null}
        </ContentScreenWrapper>
    );
}
