import { StyleSheet, View, Linking, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { CustomScrollView } from "@/components/utils/custom/ScrollView";
import { ThemedText } from "@/components/ThemedText";
import { Colors, Theme } from "@/constants/Colors";
import { NO_TOP_EDGES } from "@/constants/safeAreaEdges";

export default function ContactScreen() {
    const contactMe = () => {
        const url = "mailto:merrymerrymate@gmail.com";
        Linking.openURL(url);
    };

    return (
        <CustomScrollView>
            <SafeAreaView edges={NO_TOP_EDGES} style={{ paddingTop: 20 }}>
                <View style={styles.section}>
                    <ThemedText
                        type="sectionText"
                        style={{ fontFamily: "PoppinsBold" }}
                    >
                        Une idée, une suggestion, des remarques, un bug à
                        signaler ?
                    </ThemedText>
                </View>

                <View style={styles.section}>
                    <ThemedText type="sectionText">
                        Cette application évolue grâce aux retours que je
                        reçois, alors n’hésitez pas à m’écrire pour proposer une
                        amélioration, suggérer des contenus, signaler un
                        problème, partager votre avis...
                    </ThemedText>
                </View>

                <View style={styles.section}>
                    <ThemedText type="sectionText">
                        Chaque message sera lu avec attention et m’aidera à
                        améliorer l’application. Merci de faire partie de
                        l’aventure !
                    </ThemedText>
                </View>

                <View style={styles.section}>
                    <ThemedText type="sectionText">
                        PS : n'oubliez pas que, derrière l'écran, il y a un être
                        humain qui a passé énormément de temps à développer
                        cette application et à en créer son contenu...
                    </ThemedText>
                </View>

                <View style={styles.section}>
                    <ThemedText type="sectionText">
                        PPS : n'hésitez pas à préciser votre nom de lutin·e de
                        Noël dans le message !
                    </ThemedText>
                </View>

                <Pressable onPress={contactMe} style={styles.button}>
                    <ThemedText style={styles.buttonText}>
                        Me contacter
                    </ThemedText>
                </Pressable>
            </SafeAreaView>
        </CustomScrollView>
    );
}

const styles = StyleSheet.create({
    section: {
        marginBottom: 20,
    },
    button: {
        borderRadius: 50,
        paddingHorizontal: 28,
        minHeight: 48,
        justifyContent: "center",
        alignSelf: "center",
        backgroundColor: Theme.tint,
    },
    buttonText: {
        color: Colors.snow,
        textAlign: "center",
    },
});
