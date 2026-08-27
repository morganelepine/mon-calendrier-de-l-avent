import { Text, type TextProps, StyleSheet } from "react-native";
import { Colors, Theme } from "@/constants/Colors";

export type ThemedTextProps = TextProps & {
    type?:
        | "default"
        | "homeTitle"
        | "sectionSubtitle"
        | "sectionText"
        | "contentTitle"
        | "contentSubtitle"
        | "italic14"
        | "boldMarkdown"
        | "italicMarkdown"
        | "pallyBoldSnow";
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
                type === "homeTitle" ? styles.homeTitle : undefined,
                type === "sectionSubtitle" ? styles.sectionSubtitle : undefined,
                type === "sectionText" ? styles.sectionText : undefined,
                type === "contentTitle" ? styles.contentTitle : undefined,
                type === "contentSubtitle" ? styles.contentSubtitle : undefined,
                type === "italic14" ? styles.italic14 : undefined,
                type === "boldMarkdown" ? styles.boldMarkdown : undefined,
                type === "italicMarkdown" ? styles.italicMarkdown : undefined,
                type === "pallyBoldSnow" ? styles.pallyBoldSnow : undefined,
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
    homeTitle: {
        fontSize: 55,
        fontFamily: "PallyBold",
        textAlign: "center",
        color: Colors.snow,
        paddingHorizontal: 15,
    },
    sectionSubtitle: {
        fontFamily: "Poppins",
        color: Colors.snow,
        backgroundColor: Theme.tint,
        textAlign: "left",
        fontSize: 15,
        paddingTop: 4,
        paddingBottom: 2,
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
    contentTitle: {
        color: Theme.green,
        fontSize: 32,
        fontFamily: "PallyBold",
        textAlign: "center",
        marginVertical: 20,
        lineHeight: 34,
        letterSpacing: 2,
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
    boldMarkdown: {
        fontFamily: "PoppinsBold",
        color: Colors.darkGreen,
        textAlign: "left",
        fontSize: 16,
    },
    italicMarkdown: {
        fontFamily: "PoppinsItalic",
        color: Theme.deep,
        textAlign: "left",
        fontSize: 16,
    },
    pallyBoldSnow: {
        color: Colors.snow,
        fontFamily: "PallyBold",
        letterSpacing: 2,
    },
});
