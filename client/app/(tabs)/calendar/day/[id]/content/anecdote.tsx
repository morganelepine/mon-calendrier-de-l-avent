import { Href, useLocalSearchParams } from "expo-router";
import { ThemedText } from "@/components/ThemedText";
import { ContentScreenWrapper } from "@/components/utils/custom/ContentScreenWrapper";
import { CustomMarkdown } from "@/components/utils/custom/Markdown";
import { ExternalLink } from "@/components/utils/ExternalLink";
import { Video } from "@/components/utils/custom/Video";
import { getCloudinaryImageUrl } from "@/services/cloudinary";
import { getContentsByDay } from "@/services/content.service";

export default function AnecdoteScreen() {
    const { id } = useLocalSearchParams<{ id: string }>();
    const dayId = parseInt(id, 10);

    const { anecdote } = getContentsByDay(dayId);

    return (
        <ContentScreenWrapper
            contentType={anecdote.type}
            backgroundImage={getCloudinaryImageUrl("kiwi1_r7kihz")}
        >
            <ThemedText type="contentSubtitle">{anecdote.title}</ThemedText>

            <CustomMarkdown>{anecdote.content1}</CustomMarkdown>

            {anecdote.content4 ? <Video videoId={anecdote.content4} /> : null}

            {anecdote.content5 ? (
                <>
                    <ThemedText type="italic14" style={{ marginBottom: 10 }}>
                        Et en version moins classique...
                    </ThemedText>
                    <Video videoId={anecdote.content5} />
                </>
            ) : null}

            {anecdote.content2 ? (
                <ExternalLink
                    href={anecdote.content3 as Href}
                    style={{ marginBottom: 20 }}
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
