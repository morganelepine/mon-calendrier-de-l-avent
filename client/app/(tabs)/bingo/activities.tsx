import { BingoGrid } from "@/components/bingo/BingoGrid";
import { bingo_activities } from "@/data/bingos/bingo_activities_data";
import { StorageKeys } from "@/constants/storageKeys";

export default function BingoActivitiesScreen() {
    return (
        <BingoGrid
            clickedCellsKey={StorageKeys.bingoActivitiesClickedCells}
            grid={bingo_activities}
            columns={4}
        />
    );
}
