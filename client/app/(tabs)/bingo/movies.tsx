import { BingoGrid } from "@/components/bingo/BingoGrid";
import { bingo_movies } from "@/data/bingos/bingo_movies_data";
import { StorageKeys } from "@/constants/storageKeys";

export default function BingoMoviesScreen() {
    return (
        <BingoGrid
            clickedCellsKey={StorageKeys.bingoMoviesClickedCells}
            grid={bingo_movies}
            columns={4}
        />
    );
}
