import { useLocalSearchParams } from "expo-router";
import { getContentsByDay } from "@/services/content.service";
import { Article } from "@/components/content/story/Article";
import { StoryIntro } from "@/components/content/story/StoryIntro";
import { Story } from "@/components/content/story/Story";
import { Content } from "@/interfaces/contentInterface";

export default function StoryScreen() {
    const { id } = useLocalSearchParams<{ id: string }>();
    const dayId = parseInt(id, 10);

    const { story } = getContentsByDay(dayId) as { story: Content };

    return (
        <>
            {dayId === 1 ? <StoryIntro story={story} dayId={dayId} /> : null}
            {story.content3 === "article" ? <Article story={story} /> : null}
            {story.content3 === "story" ? (
                <Story story={story} dayId={dayId} />
            ) : null}
        </>
    );
}
