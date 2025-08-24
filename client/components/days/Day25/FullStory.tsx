import { StyleSheet } from "react-native";
import { Collapsible } from "@/components/utils/Collapsible";
import { CustomMarkdown } from "@/components/utils/custom/Markdown";
import { ModalWithText } from "@/components/utils/custom/ModalWithText";
import { CustomScrollView } from "@/components/utils/custom/ScrollView";
import { storyData } from "@/data/SheetToJSON.Story";
import { getCloudinaryImageUrl } from "@/services/cloudinary";
import { Colors } from "@/constants/Colors";

export const FullStory = () => {
    return (
        <ModalWithText
            contentType={"story"}
            backgroundImage={getCloudinaryImageUrl("s-instruire_xybqas")}
        >
            <CustomScrollView>
                {storyData.map((story) => (
                    <Collapsible
                        key={story.id}
                        title={`Chapitre ${story.id} : ${story.title}`}
                    >
                        {story.content1 ? (
                            <CustomMarkdown style={styles.subtitle}>
                                {story.content1}
                            </CustomMarkdown>
                        ) : null}

                        <CustomMarkdown style={styles.text}>
                            {story.content2}
                        </CustomMarkdown>
                    </Collapsible>
                ))}
            </CustomScrollView>
        </ModalWithText>
    );
};

const styles = StyleSheet.create({
    subtitle: {
        fontFamily: "PoppinsBold",
        textAlign: "left",
        marginTop: -5,
        color: Colors.green,
    },
    text: {
        textAlign: "left",
    },
});
