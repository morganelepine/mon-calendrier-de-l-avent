import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ModalWithText } from "@/components/utils/custom/ModalWithText";
import { CustomMarkdown } from "@/components/utils/custom/Markdown";
import { CustomScrollView } from "@/components/utils/custom/ScrollView";
import { ContentButton } from "@/components/content/ContentButton";
import { Content } from "@/interfaces/contentInterface";
import { Colors } from "@/constants/Colors";
import { getCloudinaryImageUrl } from "@/services/cloudinary";

interface StoryProps {
    content: Content;
    dayId: number;
}

export const Story: React.FC<StoryProps> = ({ content, dayId }) => {
    const [modalVisible, setModalVisible] = useState(false);
    const backgroundImage = getCloudinaryImageUrl("s-instruire_xybqas");

    return (
        <>
            <ContentButton
                content={content}
                setModalVisible={setModalVisible}
                dayId={dayId}
                backgroundImage={backgroundImage}
            />

            <ModalWithText
                isVisible={modalVisible}
                onClose={() => setModalVisible(false)}
                contentType={content.type}
                backgroundImage={backgroundImage}
            >
                <CustomScrollView>
                    <ThemedText type="modalSubtitle">
                        {content.title}
                    </ThemedText>

                    {content.content1 ? (
                        <CustomMarkdown style={styles.subtitle}>
                            {content.content1}
                        </CustomMarkdown>
                    ) : null}

                    <CustomMarkdown style={styles.text}>
                        {content.content2}
                    </CustomMarkdown>

                    {content.dayNumber < 24 && (
                        <ThemedText style={styles.end}>
                            La suite demain...
                        </ThemedText>
                    )}
                </CustomScrollView>
            </ModalWithText>
        </>
    );
};

const styles = StyleSheet.create({
    subtitle: { fontFamily: "PoppinsItalic", textAlign: "left", marginTop: -5 },
    text: {
        textAlign: "left",
    },
    end: {
        paddingVertical: 20,
        fontSize: 14,
        fontFamily: "PoppinsItalic",
        color: Colors.green,
    },
});
