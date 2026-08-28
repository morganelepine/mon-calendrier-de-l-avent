import { ReactNode } from "react";
import { Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { ThemedText } from "@/components/ThemedText";
import { TOP_EDGES } from "@/constants/safeAreaEdges";

interface ScreenHeaderProps {
    title: string;
    backgroundColor: string;
    color: string;
    rightAction?: ReactNode;
}

export const ScreenHeader: React.FC<ScreenHeaderProps> = ({
    title,
    backgroundColor,
    color,
    rightAction,
}) => {
    const router = useRouter();

    return (
        <SafeAreaView
            edges={TOP_EDGES}
            style={{
                backgroundColor,
                flexDirection: "row",
                alignItems: "center",
                paddingHorizontal: 20,
                paddingVertical: 8,
            }}
        >
            <Pressable onPress={() => router.back()}>
                <Ionicons name="arrow-back" size={24} color={color} />
            </Pressable>

            <ThemedText
                style={{
                    fontFamily: "PoppinsBold",
                    fontSize: 18,
                    color,
                    marginLeft: 12,
                    paddingTop: 2,
                }}
            >
                {title}
            </ThemedText>

            {rightAction}
        </SafeAreaView>
    );
};
