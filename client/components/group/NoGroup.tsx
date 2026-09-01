import { View, StyleSheet } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { CustomButton } from "@/components/utils/buttons/Button";
import { Colors } from "@/constants/Colors";
import { useCreateGroup } from "@/hooks/useCreateGroup";

export const NoGroup = ({
    userId,
    userUuid,
    onCreated,
}: {
    userId: number;
    userUuid: string | null;
    onCreated: () => void;
}) => {
    const createMyGroup = useCreateGroup(userId, userUuid);

    const handleCreate = async () => {
        if (await createMyGroup()) onCreated();
    };

    return (
        <View style={styles.container}>
            <ThemedText style={styles.text}>
                Vous n'avez pas encore de groupe. Créez-en un pour retrouver
                plus facilement les scores de vos ami·e·s&nbsp;!
            </ThemedText>
            <CustomButton onPress={handleCreate}>Créer mon groupe</CustomButton>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignContent: "center",
        justifyContent: "center",
        padding: 20,
        gap: 16,
    },
    text: {
        textAlign: "center",
        color: Colors.snow,
    },
});
