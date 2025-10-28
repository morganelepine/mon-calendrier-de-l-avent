import { Pressable, StyleSheet, Image } from "react-native";
import { Colors } from "@/constants/Colors";
import { Bingo } from "@/interfaces/bingoInterface";
import { getCloudinaryImageUrl } from "@/services/cloudinary";

interface BingoCellProps {
    cell: Bingo;
    isClicked: boolean;
    onClick: (id: number) => void;
    type: string;
}

export const BingoCell: React.FC<BingoCellProps> = ({
    cell,
    isClicked,
    onClick,
    type,
}) => {
    return (
        <Pressable
            style={[
                {
                    opacity: isClicked ? 0.5 : 1,
                    flexBasis: type === "activities" ? "20%" : "30%",
                    flexGrow: type === "activities" ? 1 : 0,
                },
            ]}
            onPress={() => onClick(cell.id)}
        >
            <Image
                source={{ uri: getCloudinaryImageUrl(cell.image) }}
                style={[
                    styles.itemBackground,
                    { aspectRatio: type === "activities" ? 1.05 : 1 },
                ]}
                resizeMode="contain"
            />
        </Pressable>
    );
};

const styles = StyleSheet.create({
    itemBackground: {
        width: "100%",
        height: undefined,
    },
});
