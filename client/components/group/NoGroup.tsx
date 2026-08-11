import { View, StyleSheet } from "react-native";
import { CreateGroupPrompt } from "@/components/group/CreateGroupPrompt";
import { useCreateGroup } from "@/hooks/useCreateGroup";

// Shown on the "Mon groupe" screen itself when the user doesn't own a group yet.
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
            <CreateGroupPrompt onPress={handleCreate} />
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
});
