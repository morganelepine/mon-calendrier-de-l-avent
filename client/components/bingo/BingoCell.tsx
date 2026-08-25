import { Pressable, StyleSheet, View } from "react-native";
import { Image } from "expo-image";
import { Bingo } from "@/interfaces/bingoInterface";
import { getCloudinaryImageUrl } from "@/services/cloudinary.service";
import { Colors } from "@/constants/Colors";
import { ThemedText } from "@/components/ThemedText";

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
            {cell.image ? (
                <Image
                    source={{ uri: getCloudinaryImageUrl(cell.image) }}
                    style={styles.itemBackground}
                    contentFit="contain"
                    cachePolicy="memory-disk"
                />
            ) : (
                <View style={styles.textCard}>
                    <ThemedText style={styles.itemText}>{cell.text}</ThemedText>
                </View>
            )}
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
    textCard: {
        flex: 1,
        width: "100%",
        backgroundColor: Colors.snow,
        justifyContent: "center",
        alignItems: "center",
        padding: 4,
    },
    itemText: {
        textAlign: "center",
        color: Colors.blue,
        fontSize: 12,
    },
});
