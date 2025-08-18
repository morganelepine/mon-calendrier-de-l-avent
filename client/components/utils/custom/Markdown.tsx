import { StyleSheet, TextStyle } from "react-native";
import Markdown from "react-native-markdown-display";
import { Colors } from "@/constants/Colors";

interface CustomMarkdownProps {
    children?: React.ReactNode;
    style?: TextStyle; //React.CSSProperties
}

export const CustomMarkdown: React.FC<CustomMarkdownProps> = ({
    children,
    style = {},
}) => {
    return (
        <Markdown
            style={{
                body: { ...styles.body, ...style } as TextStyle,
            }}
        >
            {children}
        </Markdown>
    );
};

const styles = StyleSheet.create({
    body: {
        color: Colors.darkGreen,
        textAlign: "left",
        fontFamily: "Poppins",
        fontSize: 16,
    },
});
