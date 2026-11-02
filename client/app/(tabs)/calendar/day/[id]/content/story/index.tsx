import { useLocalSearchParams } from "expo-router";
import { Article } from "@/components/content/story/Article";
import { StoryIntro } from "@/components/content/story/StoryIntro";
import { Story } from "@/components/content/story/Story";
import { useDayContents } from "@/hooks/useDayContents";

export default function StoryScreen() {
    const { id } = useLocalSearchParams<{ id: string }>();
    const dayId = Number.parseInt(id, 10);

    const story = useDayContents(dayId).contents?.story;

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
