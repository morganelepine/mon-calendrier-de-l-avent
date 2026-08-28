import { useState } from "react";
import {
    FlatList,
    StyleSheet,
    View,
    ActivityIndicator,
} from "react-native";
import { useRouter } from "expo-router";
import { LeaderBoardButton } from "@/components/score/LeaderBoardButton";
import { BlueBackground } from "@/components/utils/BlueBackground";
import { LeaderBoardItem } from "@/components/score/LeaderBoardItem";
import { Colors } from "@/constants/Colors";
import { Group } from "@/types/types";
import { removeMember } from "@/services/group.service";
import { showToast } from "@/components/utils/Toast";

export const MyGroup = ({
    myGroup,
    userId,
    username,
    fetchMyGroup,
}: {
    myGroup: Group;
    userId: number;
    username: string | null;
    fetchMyGroup: (userId: number) => Promise<void>;
}) => {
    const router = useRouter();

    const [loading, setLoading] = useState(false);

    const removeMemberFromGroup = async (item: {
        id?: number;
        username: string;
        score: number;
    }) => {
        if (!myGroup.id || !item.id || item.username === username) return;

        try {
            setLoading(true);
            await removeMember(myGroup.id, item.id);
            fetchMyGroup(userId);
        } catch {
            showToast("Oops... Veuillez réessayer !", "long");
        } finally {
            setLoading(false);
        }
    };

    return (
        <BlueBackground>
            {loading ? (
                <View style={styles.container}>
                    <ActivityIndicator size="large" color={Colors.snow} />
                </View>
            ) : (
                <>
                    <View style={styles.stickyContainer}>
                        <LeaderBoardButton
                            onPress={() =>
                                router.push(
                                    `/scores/addMembers?groupId=${myGroup.id}`,
                                )
                            }
                            text="Ajouter des lutins"
                        />
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
        </BlueBackground>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignContent: "center",
        justifyContent: "center",
    },
    stickyContainer: {
        position: "absolute",
        bottom: 20,
        left: 0,
        right: 0,
        alignItems: "center",
        zIndex: 10,
    },
});
