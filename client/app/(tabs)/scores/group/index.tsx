import { useEffect, useState } from "react";
import {
    StyleSheet,
    View,
    Text,
    FlatList,
    ImageBackground,
    Pressable,
} from "react-native";
import { useRouter } from "expo-router";
import { Colors } from "@/constants/Colors";
import { API_URL } from "@/constants/api";
import { ThemedText } from "@/components/ThemedText";
import { BlueStarsBackground } from "@/components/utils/BlueStarsBackground";

type User = { id: number; username: string };
type GroupMember = { user: User; addedAt: string };
type Group = { id: number; name: string; members: GroupMember[] };

export default function GroupScreen() {
    const router = useRouter();
    const [myGroup, setMyGroup] = useState<Group | null>(null);

    const userId = 1;

    const createGroup = async () => {
        const res = await fetch(`${API_URL}/groups`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: "Mon groupe",
                ownerId: userId,
            }),
        });
        const data = await res.json();
        setMyGroup(data);
    };

    const fetchMyGroup = async () => {
        const res = await fetch(`${API_URL}/groups/${userId}`);
        const data = await res.json();
        setMyGroup(data);
    };

    useEffect(() => {
        fetchMyGroup();
    }, []);

    if (!myGroup) {
        return (
            <BlueStarsBackground>
                <View
                    style={{ justifyContent: "center", flex: 1, padding: 20 }}
                >
                    <ThemedText
                        style={{
                            color: Colors.snow,
                            textAlign: "center",
                            paddingBottom: 20,
                        }}
                    >
                        Créez un groupe pour retrouver plus facilement les
                        scores de vos ami·e·s !
                    </ThemedText>

                    <Pressable style={styles.button} onPress={createGroup}>
                        <ThemedText style={{ color: Colors.snow }}>
                            Créer mon groupe
                        </ThemedText>
                    </Pressable>
                </View>
            </BlueStarsBackground>
        );
    }

    return (
        <BlueStarsBackground>
            {myGroup ? (
                <View style={{ padding: 20 }}>
                    <Pressable
                        style={styles.button}
                        onPress={() => router.push("/scores/group/addMembers")}
                    >
                        <ThemedText style={{ color: Colors.snow }}>
                            Ajouter des lutins
                        </ThemedText>
                    </Pressable>
                    <FlatList
                        data={myGroup.members}
                        keyExtractor={(item) => item.user.id.toString()}
                        renderItem={({ item }) => (
                            <Text>- {item.user.username}</Text>
                        )}
                    />
                </View>
            ) : (
                <View
                    style={{ justifyContent: "center", flex: 1, padding: 20 }}
                >
                    <ThemedText
                        style={{
                            color: Colors.snow,
                            textAlign: "center",
                            paddingBottom: 20,
                        }}
                    >
                        Créez un groupe pour retrouver plus facilement les
                        scores de vos ami·e·s !
                    </ThemedText>

                    <Pressable style={styles.button} onPress={createGroup}>
                        <ThemedText style={{ color: Colors.snow }}>
                            Créer mon groupe
                        </ThemedText>
                    </Pressable>
                </View>
            )}
        </BlueStarsBackground>
    );
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: Colors.red,
        borderRadius: 50,
        paddingVertical: 8,
        paddingHorizontal: 28,
        alignSelf: "center",
    },
});
