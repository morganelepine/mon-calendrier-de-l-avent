import { View } from "react-native";
import { GameIdea } from "@/components/content/games/others/GameIdea";
import { Joke } from "@/components/content/games/others/Joke";
import { Content } from "@/interfaces/contentInterface";

interface GamesProps {
    game: Content;
    setScore: () => Promise<void>;
}

export const Games: React.FC<GamesProps> = ({ game, setScore }) => {
    return (
        <View key={game.id}>
            {game.title === "Idée" ? (
                <GameIdea game={game} />
            ) : (
                <Joke game={game} setScore={setScore} />
            )}
        </View>
    );
};
