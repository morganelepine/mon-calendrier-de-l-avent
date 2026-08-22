import { BingoGrid } from "@/components/bingo/BingoGrid";
import { bingo } from "@/data/bingos/bingo_data";
import { StorageKeys } from "@/constants/storageKeys";

export default function BingoTelefilmsScreen() {
    return (
        <BingoGrid
            clickedCellsKey={StorageKeys.bingoFilmsClickedCells}
            grid={bingo}
            columns={4}
        />
    );
}
