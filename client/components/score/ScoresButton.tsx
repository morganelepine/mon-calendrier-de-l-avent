import { useState } from "react";
import { StyleSheet, View, Pressable } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { ThemedText } from "@/components/ThemedText";
import { NoGroupModal } from "@/components/group/NoGroupModal";
import { Colors } from "@/constants/Colors";
import { createGroup } from "@/services/group.service";
import { useUser } from "@/contexts/UserContext";

export const ScoresButton = () => {
    const { userId } = useUser();
    const [modalVisible, setModalVisible] = useState(false);

    const createMyGroup = async () => {
        if (!userId) return;
        const group = await createGroup(userId);
        if (group) {
            await AsyncStorage.setItem("groupCreated", "true");
            setModalVisible(false);
            router.navigate("/scores/group");
        }
    };

    const goToMyGroup = async () => {
        const isGroupCreated = await AsyncStorage.getItem("groupCreated");
        if (isGroupCreated) {
            router.navigate("/scores/group");
        } else {
            setModalVisible(true);
        }
    };

    return (
        <View style={styles.header}>
            <Pressable
                onPress={() => router.navigate("/scores/leaderboard")}
                style={styles.button}
            >
                <ThemedText style={styles.buttonText}>Classement</ThemedText>
            </Pressable>
            <Pressable onPress={goToMyGroup} style={styles.button}>
                <ThemedText style={styles.buttonText}>Mon groupe</ThemedText>
            </Pressable>
            <NoGroupModal
                createMyGroup={createMyGroup}
                modalVisible={modalVisible}
                setModalVisible={setModalVisible}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 20,
        width: "100%",
        gap: 16,
        marginVertical: 8,
    },
    button: {
        flexBasis: "45%",
        flexGrow: 1,
        height: 38,
        justifyContent: "center",
        borderWidth: 1,
        borderColor: Colors.snow,
        backgroundColor: Colors.snow,
        opacity: 0.8,
        borderRadius: 50,
    },
    buttonText: {
        color: Colors.blue,
        textAlign: "center",
    },
});
