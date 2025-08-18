import { StyleSheet, TextStyle } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ExternalLink } from "@/components/utils/ExternalLink";
import { Colors } from "@/constants/Colors";

interface RateButtonProps {
    children: React.ReactNode;
    style?: TextStyle;
}

export const RateButton: React.FC<RateButtonProps> = ({
    children,
    style = {},
}) => {
    return (
        <ExternalLink
            href={"https://bit.ly/3BBayBy"}
            style={{ ...style, ...styles.button }}
        >
            <ThemedText style={styles.buttonText}>{children}</ThemedText>
        </ExternalLink>
    );
};

const styles = StyleSheet.create({
    button: {
        backgroundColor: Colors.green,
        borderRadius: 50,
        paddingHorizontal: 20,
        height: 48,
        textAlign: "center",
    },
    buttonText: { color: "white", lineHeight: 48 },
});
