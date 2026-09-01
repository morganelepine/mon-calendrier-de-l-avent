import { StyleSheet, TextStyle } from "react-native";
import type { Href } from "expo-router";
import { ThemedText } from "@/components/ThemedText";
import { ExternalLink } from "@/components/utils/ExternalLink";
import { Theme, Colors } from "@/constants/Colors";

interface ExternalLinkButtonProps {
    children: React.ReactNode;
    url: string;
    style?: TextStyle;
    color?: string;
}

export const ExternalLinkButton: React.FC<ExternalLinkButtonProps> = ({
    children,
    url,
    style = {},
    color = Theme.autumnGreen,
}) => {
    return (
        <ExternalLink
            href={url as Href}
            style={{ ...style, ...styles.button, backgroundColor: color }}
        >
            <ThemedText style={styles.buttonText}>{children}</ThemedText>{" "}
        </ExternalLink>
    );
};

const styles = StyleSheet.create({
    button: {
        borderRadius: 50,
        paddingHorizontal: 28,
        height: 42,
        textAlign: "center",
        marginVertical: 10,
        marginHorizontal: 20,
        alignSelf: "center",
    },
    buttonText: {
        color: Colors.snow,
        fontFamily: "FreightNeo",
        fontSize: 18,
        textAlign: "center",
        lineHeight: 42,
    },
});
