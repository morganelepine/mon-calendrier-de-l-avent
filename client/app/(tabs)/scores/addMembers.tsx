import { useEffect, useState } from "react";
import { StyleSheet, View, TextInput, FlatList, Pressable } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { LeaderBoardButton } from "@/components/score/LeaderBoardButton";
import { BlueBackground } from "@/components/utils/BlueBackground";
import { ThemedText } from "@/components/ThemedText";
import { Colors, Theme } from "@/constants/Colors";
import { showToast } from "@/components/utils/Toast";
import { User } from "@/types/types";
import { useUser } from "@/contexts/UserContext";
import { useCreateGroup } from "@/hooks/useCreateGroup";
import { searchUsers } from "@/services/user.service";
import { addMember } from "@/services/group.service";

export default function AddMembersScreen() {
    const router = useRouter();
    const params = useLocalSearchParams();

    // Absent when coming from NoGroup: the group is created on the first add.
    const groupId = params.groupId as string | undefined;

    const { userId, userUuid } = useUser();
    const createMyGroup = useCreateGroup(userId, userUuid);

    const [query, setQuery] = useState("");
    const [results, setResults] = useState<User[]>([]);
    const [selected, setSelected] = useState<number[]>([]);

    const searchUser = async (text: string) => {
        if (text.length < 2) {
            setResults([]);
            return;
        }
        const scope = groupId ? { groupId } : userId ? { userId } : null;
        if (!scope) return;
        try {
            const users = await searchUsers(text, scope);
            setResults(users);
        } catch (error) {
            console.error("Error searching users:", error);
            showToast(
                "Oops... la recherche a échoué. Veuillez réessayer.",
                "long",
            );
        }
    };

    useEffect(() => {
        const t = setTimeout(() => searchUser(query), 150);
        return () => clearTimeout(t);
    }, [query]);

    const toggleSelect = (id: number) =>
        setSelected((prev) =>
            prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
        );

    const handleAdd = async () => {
        if (!groupId) {
            // First add: creates the group with the owner + the selection.
            const group = await createMyGroup(selected);
            if (!group) return;
            router.setParams({ groupId: String(group.id) });
            showToast(selected.length > 1 ? "Ajouté·e·s !" : "Ajouté·e !");
            setQuery("");
            setResults([]);
            setSelected([]);
            return;
        }

        try {
            for (const id of selected) {
                await addMember(Number(groupId), id);
            }
            showToast(selected.length > 1 ? "Ajouté·e·s !" : "Ajouté·e !");
            setQuery("");
            setResults([]);
            setSelected([]);
        } catch (error) {
            console.error("Error adding members:", error);
            showToast(
                "Oops... Ces lutin·e·s n'ont pas pu être ajouté·e·s. Veuillez réessayer.",
                "long",
            );
        }
    };

    return (
        <BlueBackground>
            <View style={styles.container}>
                <TextInput
                    value={query}
                    onChangeText={setQuery}
                    placeholder="Chercher des utilisateur⸱ice⸱s"
                    placeholderTextColor={Colors.disabledText}
                    style={styles.search}
                    returnKeyType="search"
                    onSubmitEditing={() => searchUser(query)}
                />

                {results.length === 0 && query.length >= 2 && (
                    <ThemedText
                        style={{
                            color: Colors.snow,
                            alignSelf: "center",
                        }}
                    >
                        Aucun résultat
                    </ThemedText>
                )}

                <FlatList
                    data={results}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <Pressable
                            onPress={() => toggleSelect(item.id)}
                            style={[
                                styles.user,
                                {
                                    backgroundColor: selected.includes(item.id)
                                        ? Theme.orangeToGreen
                                        : Colors.snow,
                                },
                            ]}
                        >
                            <ThemedText
                                style={{
                                    color: selected.includes(item.id)
                                        ? Colors.snow
                                        : Theme.orangeToBlue,
                                }}
                            >
                                {item.username}
                            </ThemedText>
                        </Pressable>
                    )}
                />

                {selected.length > 0 && (
                    <LeaderBoardButton
                        onPress={handleAdd}
                        text={groupId ? "Ajouter au groupe" : "Créer le groupe"}
                    />
                )}
            </View>
        </BlueBackground>
    );
}

const styles = StyleSheet.create({
    container: { paddingHorizontal: 20, marginBottom: 20, gap: 20, flex: 1 },
    search: {
        borderWidth: 1,
        borderColor: Colors.disabledText,
        backgroundColor: Colors.disabled,
        borderRadius: 50,
        paddingHorizontal: 20,
        height: 56,
        marginTop: 20,
        // iOS Safari auto-zooms on focus for any input under 16px.
        fontSize: 16,
    },
    user: {
        paddingHorizontal: 28,
        paddingVertical: 4,
        marginVertical: 8,
        borderRadius: 50,
        alignSelf: "center",
    },
});
