import { useLocalSearchParams } from "expo-router";
import { getContentsByDay } from "@/services/content.service";
import { Article } from "@/components/content/story/Article";
import { Story } from "@/components/content/story/Story";

export default function StoryScreen() {
    const { id } = useLocalSearchParams<{ id: string }>();
    const dayId = parseInt(id, 10);

    const { story } = getContentsByDay(dayId);

    const isNewspaper = story.content3 === "article";

    return (
        <>
            {isNewspaper ? (
                <Article story={story} />
            ) : (
                <Story story={story} dayId={dayId} />
            )}
        </>
    );
}
