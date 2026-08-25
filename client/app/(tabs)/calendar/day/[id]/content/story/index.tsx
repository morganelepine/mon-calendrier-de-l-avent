import { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { getContentsByDay } from "@/services/content.service";
import { Article } from "@/components/content/story/Article";
import { StoryIntro } from "@/components/content/story/StoryIntro";
import { Story } from "@/components/content/story/Story";
import { Content } from "@/interfaces/contentInterface";

export default function StoryScreen() {
    const { id } = useLocalSearchParams<{ id: string }>();
    const dayId = Number.parseInt(id, 10);

    const [story, setStory] = useState<Content>();

    useEffect(() => {
        getContentsByDay(dayId)
            .then((contents) => setStory(contents.story))
            .catch(() => {});
    }, [dayId]);

    if (!story) {
        return null;
    }

    return (
        <>
            {dayId === 1 ? <StoryIntro story={story} dayId={dayId} /> : null}
            {story.subType === "article" ? <Article story={story} /> : null}
            {story.subType === "story" ? (
                <Story story={story} dayId={dayId} />
            ) : null}
        </>
    );
}
