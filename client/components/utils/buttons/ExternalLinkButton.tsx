import { StyleSheet, TextStyle } from "react-native";
import type { Href } from "expo-router";
import { ThemedText } from "@/components/ThemedText";
import { ExternalLink } from "@/components/utils/ExternalLink";
import { Theme, Colors } from "@/constants/Colors";
import {
    pillButtonBase,
    pillButtonTextBase,
} from "@/components/utils/buttons/pillButtonStyles";

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
        ...pillButtonBase,
        marginVertical: 10,
    },
    buttonText: {
        ...pillButtonTextBase,
        color: Colors.snow,
        lineHeight: 42,
    },
});
