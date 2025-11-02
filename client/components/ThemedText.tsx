import { Text, type TextProps, StyleSheet } from "react-native";
import { Colors } from "@/constants/Colors";
import { useThemeColor } from "@/hooks/useThemeColor";

export type ThemedTextProps = TextProps & {
    lightColor?: string;
    darkColor?: string;
    type?:
        | "default"
        | "homeTitle"
        | "sectionSubtitle"
        | "sectionText"
        | "contentTitle"
        | "contentSubtitle"
        | "italic14"
        | "pallyBoldSnow"
        | "pallyBoldBlue";
};

export function ThemedText({
    style,
    lightColor,
    darkColor,
    type = "default",
    ...rest
}: ThemedTextProps) {
    const color = useThemeColor({ light: lightColor, dark: darkColor }, "text");

    return (
        <Text
            style={[
                // { color },
                type === "default" ? styles.default : undefined,
                type === "homeTitle" ? styles.homeTitle : undefined,
                type === "sectionSubtitle" ? styles.sectionSubtitle : undefined,
                type === "sectionText" ? styles.sectionText : undefined,
                type === "contentTitle" ? styles.contentTitle : undefined,
                type === "contentSubtitle" ? styles.contentSubtitle : undefined,
                type === "italic14" ? styles.italic14 : undefined,
                type === "pallyBoldSnow" ? styles.pallyBoldSnow : undefined,
                type === "pallyBoldBlue" ? styles.pallyBoldBlue : undefined,
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
        paddingTop: 4,
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
        backgroundColor: Colors.blue,
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
        color: Colors.darkBlue,
        paddingHorizontal: 20,
    },
    contentTitle: {
        color: Colors.green,
        fontSize: 32,
        fontFamily: "PallyBold",
        textAlign: "center",
        marginVertical: 20,
        lineHeight: 34,
        letterSpacing: 2,
    },
    contentSubtitle: {
        color: Colors.green,
        fontSize: 16,
        fontFamily: "PoppinsBold",
    },
    italic14: {
        fontSize: 14,
        fontFamily: "PoppinsItalic",
    },
    pallyBoldSnow: {
        color: Colors.snow,
        fontFamily: "PallyBold",
        letterSpacing: 2,
    },
    pallyBoldBlue: {
        color: Colors.blue,
        fontFamily: "PallyBold",
        letterSpacing: 2,
    },
});
