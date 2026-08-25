import { Pressable, StyleSheet } from "react-native";
import { Image } from "expo-image";
import { Bingo } from "@/interfaces/bingoInterface";
import { getCloudinaryImageUrl } from "@/services/cloudinary.service";

interface BingoCellProps {
    cell: Bingo;
    isClicked: boolean;
    onClick: (id: number) => void;
    size: number;
}

export const BingoCell: React.FC<BingoCellProps> = ({
    cell,
    isClicked,
    onClick,
    size,
}) => {
    return (
        <Pressable
            style={[
                styles.cell,
                { opacity: isClicked ? 0.5 : 1, width: size, height: size },
            ]}
            onPress={() => onClick(cell.id)}
        >
            <Image
                source={{ uri: getCloudinaryImageUrl(cell.image) }}
                style={styles.itemBackground}
                contentFit="contain"
                cachePolicy="memory-disk"
            />
        </Pressable>
    );
};

const styles = StyleSheet.create({
    cell: {
        padding: 3,
    },
    itemBackground: {
        width: "100%",
        height: "100%",
    },
});
