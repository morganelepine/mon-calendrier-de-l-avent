import { StyleSheet, TextStyle } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ExternalLink } from "@/components/utils/ExternalLink";
import { Colors, Theme } from "@/constants/Colors";

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
            href={
                "https://play.google.com/store/apps/details?id=com.merrymate.moncalendrierdelavent"
            }
            style={{ ...style, ...styles.button }}
        >
            <ThemedText style={styles.buttonText}>{children}</ThemedText>
        </ExternalLink>
    );
};

const styles = StyleSheet.create({
    button: {
        backgroundColor: Theme.tint,
        borderRadius: 50,
        paddingHorizontal: 24,
        height: 48,
        textAlign: "center",
        elevation: 2,
    },
    buttonText: { color: Colors.snow, lineHeight: 48 },
});
