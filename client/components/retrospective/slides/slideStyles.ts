import { StyleSheet } from "react-native";
import { Colors } from "@/constants/Colors";

export const slideStyles = StyleSheet.create({
    kicker: {
        fontFamily: "PoppinsBold",
        fontSize: 14,
        letterSpacing: 1,
        textTransform: "uppercase",
        color: Colors.lightRed,
        textAlign: "center",
        marginBottom: 8,
    },
    title: {
        fontFamily: "FreightNeoBold",
        fontSize: 26,
        lineHeight: 32,
        textAlign: "center",
    },
    bigNumber: {
        fontFamily: "FreightNeoBold",
        fontSize: 80,
        color: Colors.lightRed,
        textAlign: "center",
    },
});
