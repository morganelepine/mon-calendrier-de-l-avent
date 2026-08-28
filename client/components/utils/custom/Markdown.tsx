import React from "react";
import { Linking, StyleSheet, Text, TextStyle, View } from "react-native";
import { Colors, Theme } from "@/constants/Colors";
import { ThemedText } from "@/components/ThemedText";

interface CustomMarkdownProps {
    children?: React.ReactNode;
    style?: TextStyle;
}

// Minimal markdown renderer covering the subset our content actually uses:
// bold and italic (both ** / __ and * / _ forms), [text](url) links,
// blank-line-separated paragraphs, and "- " bullet lists..

type InlineSegment =
    | { type: "text"; content: string }
    | { type: "bold"; content: string }
    | { type: "italic"; content: string }
    | { type: "link"; content: string; href: string };

type Block =
    | { type: "paragraph"; text: string }
    | { type: "list"; items: string[] };

// Priority order matters: "**"/"__" must be tried before the single-char variants
// so "**bold**" isn't read as italic. The single "_" variant is word-boundary guarded
// so things like snake_case aren't read as emphasis.
const INLINE_PATTERN =
    /\*\*(.+?)\*\*|__(.+?)__|\*(.+?)\*|(?<!\w)_(.+?)_(?!\w)|\[([^\]]+)\]\(([^)]+)\)/g;

function parseInline(text: string): InlineSegment[] {
    const segments: InlineSegment[] = [];
    let lastIndex = 0;
    let match: RegExpExecArray | null;

    INLINE_PATTERN.lastIndex = 0;
    while ((match = INLINE_PATTERN.exec(text))) {
        if (match.index > lastIndex) {
            segments.push({
                type: "text",
                content: text.slice(lastIndex, match.index),
            });
        }
        const [, bold1, bold2, italic1, italic2, linkText, linkHref] = match;
        if (bold1 !== undefined || bold2 !== undefined) {
            segments.push({ type: "bold", content: (bold1 ?? bold2)! });
        } else if (italic1 !== undefined || italic2 !== undefined) {
            segments.push({ type: "italic", content: (italic1 ?? italic2)! });
        } else if (linkText !== undefined) {
            segments.push({ type: "link", content: linkText, href: linkHref });
        }
        lastIndex = INLINE_PATTERN.lastIndex;
    }
    if (lastIndex < text.length) {
        segments.push({ type: "text", content: text.slice(lastIndex) });
    }
    return segments;
}

// Streams line by line rather than splitting on blank lines first, because
// content commonly puts a list right after an intro line with no blank line
// between them (e.g. "Instructions\nDo the following:\n- step one\n- step
// two"). A list starts as soon as a "- "/"* " line is seen — even mid-block —
// and ends at the first line that isn't one. Consecutive non-list lines stay
// part of the same paragraph but keep their line break (native Text renders
// "\n" as a real line break, unlike HTML, so this reproduces "one Enter in
// the CMS = one visible line break").
// Returns the item text if `line` is a "- " / "* " bullet, otherwise null.
// Written without regex (rather than /^[-*]\s+(.*)$/) to sidestep the
// \s+ + .* backtracking-risk pattern linters flag on user-controlled input.
function matchListItem(line: string): string | null {
    const marker = line[0];
    if (marker !== "-" && marker !== "*") {
        return null;
    }
    const rest = line.slice(1);
    const item = rest.trimStart();
    return item !== rest ? item : null;
}

function parseBlocks(source: string): Block[] {
    const lines = source.replaceAll("\r\n", "\n").split("\n");
    const blocks: Block[] = [];
    let paragraphLines: string[] = [];
    let listItems: string[] = [];

    const flushParagraph = () => {
        if (paragraphLines.length > 0) {
            blocks.push({ type: "paragraph", text: paragraphLines.join("\n") });
            paragraphLines = [];
        }
    };
    const flushList = () => {
        if (listItems.length > 0) {
            blocks.push({ type: "list", items: listItems });
            listItems = [];
        }
    };

    for (const rawLine of lines) {
        const line = rawLine.trim();
        if (!line) {
            flushParagraph();
            flushList();
            continue;
        }
        const listItem = matchListItem(line);
        if (listItem !== null) {
            flushParagraph();
            listItems.push(listItem);
        } else {
            flushList();
            paragraphLines.push(line);
        }
    }
    flushParagraph();
    flushList();

    return blocks;
}

function renderInline(text: string) {
    return parseInline(text).map((segment) => {
        const key =
            segment.type === "link"
                ? `${segment.type}-${segment.content}-${segment.href}`
                : `${segment.type}-${segment.content}`;
        switch (segment.type) {
            case "bold":
                return (
                    <ThemedText key={key} style={styles.bold}>
                        {segment.content}
                    </ThemedText>
                );
            case "italic":
                return (
                    <ThemedText key={key} style={styles.italic}>
                        {segment.content}
                    </ThemedText>
                );
            case "link":
                return (
                    <Text
                        key={key}
                        style={styles.link}
                        onPress={() => Linking.openURL(segment.href)}
                    >
                        {segment.content}
                    </Text>
                );
            default:
                return (
                    <React.Fragment key={key}>{segment.content}</React.Fragment>
                );
        }
    });
}

export const CustomMarkdown: React.FC<CustomMarkdownProps> = ({
    children,
    style = {},
}) => {
    const bodyStyle: TextStyle = { ...styles.body, ...style };
    const blocks = parseBlocks(String(children ?? ""));

    return (
        <>
            {blocks.map((block) =>
                block.type === "list" ? (
                    <View key={`list-${block.items.join("|")}`}>
                        {block.items.map((item) => (
                            <View key={`item-${item}`} style={styles.listItem}>
                                <Text style={[bodyStyle, styles.bullet]}>
                                    {"•"}
                                </Text>
                                <Text style={[bodyStyle, styles.listItemText]}>
                                    {renderInline(item)}
                                </Text>
                            </View>
                        ))}
                    </View>
                ) : (
                    <Text key={`paragraph-${block.text}`} style={bodyStyle}>
                        {renderInline(block.text)}
                    </Text>
                ),
            )}
        </>
    );
};

const styles = StyleSheet.create({
    body: {
        color: Colors.darkGreen,
        textAlign: "left",
        fontFamily: "Poppins",
        fontSize: 16,
        paddingVertical: 4,
    },
    bold: {
        fontFamily: "PoppinsBold",
        color: Colors.darkGreen,
        textAlign: "left",
        fontSize: 16,
    },
    italic: {
        fontFamily: "PoppinsItalic",
        color: Theme.deep,
        textAlign: "left",
        fontSize: 16,
    },
    listItem: {
        flexDirection: "row",
        alignItems: "flex-start",
    },
    bullet: {
        marginRight: 8,
    },
    listItemText: {
        flex: 1,
    },
    link: {
        color: Theme.green,
        textDecorationLine: "underline",
    },
});
