import { useState } from "react";
import { Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { ThemedText } from "@/components/ThemedText";
import { GroupInfoModal } from "@/components/group/GroupInfoModal";

interface CustomHeaderProps {
    title: string;
    backgroundColor: string;
    color: string;
    page?: string;
}

export const CustomHeader: React.FC<CustomHeaderProps> = ({
    title,
    backgroundColor,
    color,
    page,
}) => {
    const router = useRouter();
    const [modalVisible, setModalVisible] = useState(false);

    return (
        <SafeAreaView
            style={{
                backgroundColor: backgroundColor,
                flexDirection: "row",
                alignItems: "center",
                paddingHorizontal: 20,
                paddingVertical: 4,
            }}
        >
            <Pressable onPress={() => router.back()}>
                <Ionicons name="arrow-back" size={24} color={color} />
            </Pressable>

            <ThemedText
                style={{
                    fontFamily: "PoppinsBold",
                    fontSize: 18,
                    color: color,
                    marginLeft: 12,
                    paddingTop: 2,
                }}
            >
                {title}
            </ThemedText>

            {(page === "group" || page === "addMembers") && (
                <Pressable
                    style={{ marginLeft: "auto" }}
                    onPress={() => setModalVisible(true)}
                >
                    <Ionicons
                        name="help-circle-outline"
                        size={28}
                        color={color}
                    />
                </Pressable>
            )}
            <GroupInfoModal
                modalVisible={modalVisible}
                setModalVisible={setModalVisible}
            />
        </SafeAreaView>
    );
};
