import { View } from "react-native";
import { GameIdea } from "@/components/content/games/others/GameIdea";
import { OtherGames } from "@/components/content/games/others/OtherGames";
import { Content } from "@/interfaces/contentInterface";

interface GamesProps {
    game: Content;
    setScore: (questionNumber: number) => Promise<void>;
}

export const Games: React.FC<GamesProps> = ({ game, setScore }) => {
    return (
        <View key={game.id}>
            {game.title === "Idée" ? (
                <GameIdea game={game} />
            ) : (
                <OtherGames game={game} setScore={setScore} />
            )}
        </View>
    );
};
