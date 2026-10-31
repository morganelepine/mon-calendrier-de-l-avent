import { useState } from "react";
import { Pressable } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { ScreenHeader } from "@/components/navigation/ScreenHeader";
import { GroupInfoModal } from "@/components/group/GroupInfoModal";

interface GroupHeaderProps {
    title: string;
    backgroundColor: string;
    color: string;
}

export const GroupHeader: React.FC<GroupHeaderProps> = ({
    title,
    backgroundColor,
    color,
}) => {
    const [modalVisible, setModalVisible] = useState(false);

    return (
        <>
            <ScreenHeader
                title={title}
                backgroundColor={backgroundColor}
                color={color}
                rightAction={
                    <Pressable
                        style={{ marginLeft: "auto" }}
                        onPress={() => setModalVisible(true)}
                        hitSlop={10}
                        accessibilityRole="button"
                        accessibilityLabel="En savoir plus sur la gestion d'un groupe"
                    >
                        <Ionicons
                            name="help-circle-outline"
                            size={24}
                            color={color}
                        />
                    </Pressable>
                }
            />
            <GroupInfoModal
                modalVisible={modalVisible}
                setModalVisible={setModalVisible}
            />
        </>
    );
};
