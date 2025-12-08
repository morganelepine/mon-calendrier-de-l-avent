import { useState } from "react";
import {
    FlatList,
    Pressable,
    StyleSheet,
    View,
    ToastAndroid,
    ActivityIndicator,
} from "react-native";
import { useRouter } from "expo-router";
import { ThemedText } from "@/components/ThemedText";
import { BlueStarsBackground } from "@/components/utils/BlueStarsBackground";
import { LeaderBoardItem } from "@/components/score/LeaderBoardItem";
import { Colors } from "@/constants/Colors";
import { Group } from "@/types/types";
import { removeMember } from "@/services/group.service";

export const MyGroup = ({
    myGroup,
    username,
}: {
    myGroup: Group;
    username: string | null;
}) => {
    const router = useRouter();

    const [loading, setLoading] = useState(false);

    const removeMemberFromGroup = async (item: {
        id: number;
        username: string;
    }) => {
        if (!myGroup.id || !item.id || item.username === username) return;

        try {
            setLoading(true);
            await removeMember(myGroup.id, item.id);
        } catch {
            ToastAndroid.show(
                "Oops... Veuillez réessayer !",
                ToastAndroid.LONG
            );
        } finally {
            setLoading(false);
            router.replace(`/scores/group`);
        }
    };

    return (
        <BlueStarsBackground>
            <View style={{ flex: 1 }}>
                {loading ? (
                    <View style={styles.container}>
                        <ActivityIndicator size="large" color={Colors.snow} />
                    </View>
                ) : (
                    <>
                        <View style={styles.stickyContainer}>
                            <Pressable
                                style={styles.button}
                                onPress={() =>
                                    router.push(
                                        `/scores/addMembers?groupId=${myGroup.id}`
                                    )
                                }
                            >
                                <ThemedText style={{ color: Colors.snow }}>
                                    Ajouter des lutins
                                </ThemedText>
                            </Pressable>
                        </View>
                        <FlatList
                            data={myGroup.members}
                            extraData={myGroup.members}
                            keyExtractor={(item) => item.user.id.toString()}
                            contentContainerStyle={{ paddingBottom: 80 }}
                            renderItem={({ item, index }) => (
                                <LeaderBoardItem
                                    index={index}
                                    item={{
                                        id: item.user.id,
                                        username: item.user.username,
                                        score: item.user.score,
                                    }}
                                    username={username}
                                    onPress={removeMemberFromGroup}
                                />
                            )}
                        />
                    </>
                )}
            </View>
        </BlueStarsBackground>
    );
};

const styles = StyleSheet.create({
    stickyContainer: {
        position: "absolute",
        bottom: 20,
        left: 0,
        right: 0,
        alignItems: "center",
        zIndex: 10,
    },
    button: {
        backgroundColor: Colors.green,
        borderWidth: 1,
        borderColor: Colors.snow,
        borderRadius: 50,
        paddingVertical: 6,
        paddingHorizontal: 28,
    },
    container: {
        flex: 1,
        alignContent: "center",
        justifyContent: "center",
    },
    text: {
        color: Colors.snow,
        fontFamily: "PoppinsItalic",
        textAlign: "center",
    },
});
