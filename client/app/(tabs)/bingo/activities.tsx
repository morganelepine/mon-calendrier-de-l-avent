import { BingoGrid } from "@/components/bingo/BingoGrid";
import { bingo_todo } from "@/data/bingo_todo_data";

const CLICKED_CELLS_KEY = "bingo_activities_clicked_cells";

export default function BingoTodoScreen() {
    return <BingoGrid clickedCellsKey={CLICKED_CELLS_KEY} grid={bingo_todo} />;
}
