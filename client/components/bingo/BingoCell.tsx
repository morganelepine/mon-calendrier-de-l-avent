import { Pressable, StyleSheet, Image } from "react-native";
import { Colors } from "@/constants/Colors";
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
                styles.cell,
                {
                    backgroundColor: isClicked ? Colors.red : "white",
                    borderColor: isClicked ? Colors.red : "white",
                    borderWidth: 1,
                    opacity: isClicked ? 0.8 : 1,
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
    cell: {
        flexBasis: "30%",
        flexGrow: 1,
        aspectRatio: 1,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 12,
        padding: 4,
    },
    itemBackground: {
        width: "100%",
        height: undefined,
        aspectRatio: 1,
        borderRadius: 10,
    },
});
