import { BingoGrid } from "@/components/bingo/BingoGrid";
import { bingo_activities } from "@/data/bingos/bingo_activities_data";

const CLICKED_CELLS_KEY = "bingo_activities_clicked_cells";

export default function BingoActivitiesScreen() {
    return (
        <BingoGrid clickedCellsKey={CLICKED_CELLS_KEY} grid={bingo_activities} />
    );
}
