import { BingoGrid } from "@/components/bingo/BingoGrid";
import { bingo } from "@/data/bingo_data";

const CLICKED_CELLS_KEY = "bingo_films_clicked_cells";

export default function BingoTelefilmsScreen() {
    return <BingoGrid clickedCellsKey={CLICKED_CELLS_KEY} grid={bingo} />;
}
