import { useEffect, useState } from "react";
import {
    StyleSheet,
    View,
    TextInput,
    FlatList,
    Pressable,
    ToastAndroid,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import { BlueStarsBackground } from "@/components/utils/BlueStarsBackground";
import { ThemedText } from "@/components/ThemedText";
import { Colors } from "@/constants/Colors";
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
        const users = await searchUsers(text, groupId);
        setResults(users);
    };

    useEffect(() => {
        const t = setTimeout(() => searchUser(query), 300);
        return () => clearTimeout(t);
    }, [query]);

    const toggleSelect = (id: number) =>
        setSelected((prev) =>
            prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
        );

    const handleAdd = async () => {
        for (const id of selected) {
            await addMember(Number(groupId), id);
            ToastAndroid.show("Ajouté·e·s !", ToastAndroid.SHORT);
        }
        setQuery("");
        setResults([]);
        setSelected([]);
    };

    return (
        <BlueStarsBackground>
            <View style={styles.container}>
                <TextInput
                    value={query}
                    onChangeText={setQuery}
                    placeholder="Chercher des utilisateur⸱ice⸱s"
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
                                        : Colors.blue,
                                }}
                            >
                                {item.username}
                            </ThemedText>
                        </Pressable>
                    )}
                />

                {selected.length > 0 && (
                    <Pressable style={styles.button} onPress={handleAdd}>
                        <ThemedText style={{ color: Colors.snow }}>
                            Ajouter au groupe
                        </ThemedText>
                    </Pressable>
                )}
            </View>
        </BlueStarsBackground>
    );
}

const styles = StyleSheet.create({
    container: { padding: 20, gap: 20, flex: 1 },
    search: {
        borderWidth: 1,
        borderColor: Colors.disabledText,
        backgroundColor: Colors.disabled,
        borderRadius: 50,
        paddingHorizontal: 20,
        height: 56,
    },
    user: {
        paddingHorizontal: 28,
        paddingVertical: 4,
        marginVertical: 8,
        borderRadius: 50,
        alignSelf: "center",
    },
    button: {
        backgroundColor: Colors.red,
        borderRadius: 50,
        paddingVertical: 4,
        paddingHorizontal: 28,
        alignSelf: "center",
    },
});
