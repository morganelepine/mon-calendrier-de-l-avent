import { Text, type TextProps, StyleSheet } from "react-native";
import { Colors, Theme } from "@/constants/Colors";

export type ThemedTextProps = TextProps & {
    type?:
        | "default"
        | "sectionSubtitle"
        | "sectionText"
        | "sectionTextItalic"
        | "contentTitle"
        | "contentSubtitle"
        | "italic14"
        | "freightNeoBoldSnow"
        | "modalTitle"
        | "modalTitleSmall";
};

export function ThemedText({
    style,
    type = "default",
    ...rest
}: ThemedTextProps) {
    return (
        <Text
            style={[
                type === "default" ? styles.default : undefined,
                type === "sectionSubtitle" ? styles.sectionSubtitle : undefined,
                type === "sectionText" ? styles.sectionText : undefined,
                type === "sectionTextItalic"
                    ? styles.sectionTextItalic
                    : undefined,
                type === "contentTitle" ? styles.contentTitle : undefined,
                type === "contentSubtitle" ? styles.contentSubtitle : undefined,
                type === "italic14" ? styles.italic14 : undefined,
                type === "freightNeoBoldSnow"
                    ? styles.freightNeoBoldSnow
                    : undefined,
                type === "modalTitle" ? styles.modalTitle : undefined,
                type === "modalTitleSmall" ? styles.modalTitleSmall : undefined,
                style,
            ]}
            {...rest}
        />
    );
}

const styles = StyleSheet.create({
    default: {
        fontSize: 16,
        fontFamily: "Poppins",
        color: Colors.darkGreen,
        paddingTop: 3,
    },
    sectionSubtitle: {
        fontFamily: "FreightNeo",
        color: Colors.snow,
        backgroundColor: Theme.tint,
        textAlign: "left",
        fontSize: 17,
        paddingTop: 3,
        paddingBottom: 5,
        paddingHorizontal: 20,
        marginRight: 20,
        marginBottom: 8,
        borderTopRightRadius: 50,
        borderBottomRightRadius: 50,
        alignSelf: "flex-start",
    },
    sectionText: {
        fontSize: 15,
        fontFamily: "Poppins",
        textAlign: "left",
        color: Theme.deep,
        paddingHorizontal: 20,
    },
    sectionTextItalic: {
        fontSize: 15,
        fontFamily: "PoppinsItalic",
        textAlign: "left",
        color: Theme.deep,
        paddingHorizontal: 20,
    },
    contentTitle: {
        color: Theme.green,
        fontSize: 32,
        fontFamily: "FreightNeoBold",
        textAlign: "center",
        marginVertical: 20,
        letterSpacing: 1,
    },
    contentSubtitle: {
        color: Theme.header,
        fontSize: 16,
        fontFamily: "PoppinsBold",
    },
    italic14: {
        fontSize: 14,
        fontFamily: "PoppinsItalic",
    },
    freightNeoBoldSnow: {
        color: Colors.snow,
        fontFamily: "FreightNeoBold",
        letterSpacing: 1,
        textAlign: "center",
    },
    modalTitle: {
        fontFamily: "FreightNeoBold",
        textAlign: "center",
        marginTop: 20,
        fontSize: 28,
        color: Theme.tint,
    },
    modalTitleSmall: {
        fontFamily: "PoppinsBold",
        textAlign: "center",
        marginTop: 20,
        fontSize: 22,
        color: Theme.tint,
    },
});
