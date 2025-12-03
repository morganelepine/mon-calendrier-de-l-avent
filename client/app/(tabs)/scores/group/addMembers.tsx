import { useEffect, useState } from "react";
import { StyleSheet, View, TextInput, FlatList, Pressable } from "react-native";
import { useRouter } from "expo-router";
import { API_URL } from "@/constants/api";
import { BlueStarsBackground } from "@/components/utils/BlueStarsBackground";
import { ThemedText } from "@/components/ThemedText";
import { Colors } from "@/constants/Colors";

type User = { id: number; username: string };
type Group = { id: number; name: string };

export default function AddMembersScreen() {
    const router = useRouter();

    const [query, setQuery] = useState("");
    const [results, setResults] = useState<User[]>([]);
    const [selected, setSelected] = useState<number[]>([]);
    const [myGroup, setMyGroup] = useState<Group | null>(null);

    const userId = 1; // utilisateur courant

    const fetchMyGroup = async () => {
        const res = await fetch(`${API_URL}/groups/${userId}`);
        setMyGroup(await res.json());
    };

    const searchUsers = async (text: string) => {
        if (text.length < 2) {
            setResults([]);
            return;
        }

        const res = await fetch(`${API_URL}/users/search?query=${text}`);
        const data = await res.json();
        setResults(data);
    };

    useEffect(() => {
        const t = setTimeout(() => searchUsers(query), 300);
        return () => clearTimeout(t);
    }, [query]);

    useEffect(() => {
        fetchMyGroup();
    }, []);

    const toggleSelect = (id: number) =>
        setSelected((prev) =>
            prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
        );

    const handleAdd = async () => {
        if (!myGroup) return;

        for (const id of selected) {
            await fetch(`${API_URL}/groups/${myGroup.id}/members`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ userId: id }),
            });
        }

        fetchMyGroup();
        router.back();
    };

    return (
        <BlueStarsBackground>
            <View style={{ padding: 20, gap: 20 }}>
                <ThemedText
                    style={{
                        color: Colors.snow,
                        textAlign: "center",
                    }}
                >
                    Recherchez des lutin·e·s à ajouter :
                </ThemedText>

                <TextInput
                    value={query}
                    onChangeText={setQuery}
                    placeholder="Rechercher un nom..."
                    placeholderTextColor={Colors.darkBlue}
                    style={styles.search}
                    returnKeyType="search"
                    onSubmitEditing={() => searchUsers(query)}
                />

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
                                        : Colors.darkBlue,
                                }}
                            >
                                {item.username}
                            </ThemedText>
                        </Pressable>
                    )}
                />

                <Pressable
                    style={[
                        styles.button,
                        { opacity: selected.length === 0 ? 0.4 : 1 },
                    ]}
                    onPress={handleAdd}
                    disabled={selected.length === 0}
                >
                    <ThemedText style={{ color: Colors.snow }}>
                        Ajouter au groupe
                    </ThemedText>
                </Pressable>
            </View>
        </BlueStarsBackground>
    );
}

const styles = StyleSheet.create({
    search: {
        backgroundColor: Colors.snow,
        borderRadius: 50,
        paddingHorizontal: 20,
        paddingVertical: 8,
        color: Colors.darkBlue,
        fontFamily: "Poppins",
    },
    button: {
        backgroundColor: Colors.red,
        borderRadius: 50,
        paddingVertical: 4,
        paddingHorizontal: 28,
        alignSelf: "center",
    },
    user: {
        paddingHorizontal: 28,
        paddingVertical: 4,
        marginTop: 5,
        borderRadius: 50,
        alignSelf: "center",
    },
});
