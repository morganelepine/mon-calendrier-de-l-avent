import { useEffect, useState } from "react";
import {
    StyleSheet,
    View,
    TextInput,
    FlatList,
    Pressable,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import { LeaderBoardButton } from "@/components/score/LeaderBoardButton";
import { BlueBackground } from "@/components/utils/BlueBackground";
import { ThemedText } from "@/components/ThemedText";
import { Colors, Theme } from "@/constants/Colors";
import { showToast } from "@/components/utils/Toast";
import { User } from "@/types/types";
import { searchUsers } from "@/services/user.service";
import { addMember } from "@/services/group.service";

export default function AddMembersScreen() {
    const params = useLocalSearchParams();
    const groupId = params.groupId as string;

    const [query, setQuery] = useState("");
    const [results, setResults] = useState<User[]>([]);
    const [selected, setSelected] = useState<number[]>([]);

    const searchUser = async (text: string) => {
        if (text.length < 2) {
            setResults([]);
            return;
        }
        try {
            const users = await searchUsers(text, groupId);
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
                                        ? Colors.green
                                        : Colors.snow,
                                },
                            ]}
                        >
                            <ThemedText
                                style={{
                                    color: selected.includes(item.id)
                                        ? Colors.snow
                                        : Theme.tint,
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
                        text="Ajouter au groupe"
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
    },
    user: {
        paddingHorizontal: 28,
        paddingVertical: 4,
        marginVertical: 8,
        borderRadius: 50,
        alignSelf: "center",
    },
});
