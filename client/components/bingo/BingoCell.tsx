import { Pressable, StyleSheet, Image } from "react-native";
import { Bingo } from "@/interfaces/bingoInterface";
import { getCloudinaryImageUrl } from "@/services/cloudinary";

interface BingoCellProps {
    cell: Bingo;
    isClicked: boolean;
    onClick: (id: number) => void;
}

export const BingoCell: React.FC<BingoCellProps> = ({
    cell,
    isClicked,
    onClick,
}) => {
    return (
        <Pressable
            style={[
                {
                    opacity: isClicked ? 0.5 : 1,
                    flexBasis: "20%",
                    flexGrow: 1,
                },
            ]}
            onPress={() => onClick(cell.id)}
        >
            <Image
                source={{ uri: getCloudinaryImageUrl(cell.image) }}
                style={styles.itemBackground}
                resizeMode="contain"
            />
        </Pressable>
    );
};

const styles = StyleSheet.create({
    itemBackground: {
        width: "100%",
        height: undefined,
        aspectRatio: 1.05,
    },
});
