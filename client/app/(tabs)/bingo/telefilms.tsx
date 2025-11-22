import { BingoGrid } from "@/components/bingo/BingoGrid";
import { bingo } from "@/data/bingo_data";

const CLICKED_CELLS_KEY = "bingo_clicked_cells";
const GRID_KEY = "bingo_grid";

export default function BingoTelefilmsScreen() {
    return (
        <BingoGrid
            clickedCellsKey={CLICKED_CELLS_KEY}
            gridKey={GRID_KEY}
            grid={bingo}
        />
    );
}
