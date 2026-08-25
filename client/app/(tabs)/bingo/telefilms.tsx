import { BingoGrid } from "@/components/bingo/BingoGrid";
import { bingo_telefilms } from "@/data/bingos/bingo_telefilms_data";
import { StorageKeys } from "@/constants/storageKeys";

export default function BingoTelefilmsScreen() {
    return (
        <BingoGrid
            clickedCellsKey={StorageKeys.bingoTelefilmsClickedCells}
            grid={bingo_telefilms}
            columns={4}
        />
    );
}
