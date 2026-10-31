import { useState } from "react";
import { Pressable } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { ScreenHeader } from "@/components/navigation/ScreenHeader";
import { BingoRulesModal } from "@/components/bingo/BingoRulesModal";
import { Colors } from "@/constants/Colors";

interface BingoHeaderProps {
    title: string;
    rules: React.ReactNode;
}

export const BingoHeader: React.FC<BingoHeaderProps> = ({ title, rules }) => {
    const [modalVisible, setModalVisible] = useState(false);

    return (
        <>
            <ScreenHeader
                title={title}
                backgroundColor={Colors.snow}
                color={Colors.blue}
                rightAction={
                    <Pressable
                        style={{ marginLeft: "auto" }}
                        onPress={() => setModalVisible(true)}
                        hitSlop={10}
                        accessibilityRole="button"
                        accessibilityLabel="Voir les règles du bingo"
                    >
                        <Ionicons
                            name="help-circle-outline"
                            size={24}
                            color={Colors.blue}
                        />
                    </Pressable>
                }
            />
            <BingoRulesModal
                title={title}
                modalVisible={modalVisible}
                setModalVisible={setModalVisible}
            >
                {rules}
            </BingoRulesModal>
        </>
    );
};
