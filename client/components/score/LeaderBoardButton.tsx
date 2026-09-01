import { StyleSheet } from "react-native";
import { CustomButton } from "@/components/utils/buttons/Button";

interface LeaderBoardButtonProps {
    onPress: () => void;
    text: string;
    loadingMore?: boolean;
}

export const LeaderBoardButton = ({
    onPress,
    text,
    loadingMore,
}: LeaderBoardButtonProps) => {
    return (
        <CustomButton
            style={styles.button}
            onPress={onPress}
            disabled={loadingMore}
            loading={loadingMore}
        >
            {text}
        </CustomButton>
    );
};

const styles = StyleSheet.create({
    button: {
        marginTop: 20,
    },
});
