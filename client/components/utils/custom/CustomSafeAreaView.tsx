import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface CustomSafeAreaViewProps {
    children: React.ReactNode;
}

export const CustomSafeAreaView: React.FC<CustomSafeAreaViewProps> = ({
    children,
}) => {
    return (
        <SafeAreaView edges={["top"]} style={styles.safeAreaView}>
            {children}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeAreaView: {
        flex: 1,
        backgroundColor: "transparent",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
    },
});
