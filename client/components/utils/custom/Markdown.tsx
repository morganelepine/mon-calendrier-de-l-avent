import React from "react";
import { StyleSheet, TextStyle } from "react-native";
import Markdown from "react-native-markdown-display";
import { Colors } from "@/constants/Colors";
import { ThemedText } from "@/components/ThemedText";

interface CustomMarkdownProps {
    children?: React.ReactNode;
    style?: TextStyle;
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
            rules={{
                em: (node) => (
                    <ThemedText type="italicMarkdown">
                        {node.children.map((child, i) => (
                            <React.Fragment key={`${child.content}-${i}`}>
                                {child.content}
                            </React.Fragment>
                        ))}
                    </ThemedText>
                ),
                strong: (node) => (
                    <ThemedText type="boldMarkdown">
                        {node.children.map((child, i) => (
                            <React.Fragment key={`${child.content}-${i}`}>
                                {child.content}
                            </React.Fragment>
                        ))}
                    </ThemedText>
                ),
            }}
        >
            {String(children)}
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
