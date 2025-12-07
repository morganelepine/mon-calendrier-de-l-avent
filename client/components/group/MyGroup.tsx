import { FlatList, Pressable, StyleSheet, View } from "react-native";
import { useRouter } from "expo-router";
import { ThemedText } from "@/components/ThemedText";
import { BlueStarsBackground } from "@/components/utils/BlueStarsBackground";
import { LeaderBoardItem } from "@/components/score/LeaderBoardItem";
import { Colors } from "@/constants/Colors";
import { Group } from "@/types/types";

export const MyGroup = ({
    myGroup,
    username,
}: {
    myGroup: Group;
    username: string | null;
}) => {
    const router = useRouter();

    return (
        <BlueStarsBackground>
            <View style={{ flex: 1 }}>
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
                            groupId={myGroup.id}
                        />
                    )}
                />
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
});
