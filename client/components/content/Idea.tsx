import React, { useState, useEffect } from "react";
import { View } from "react-native";
import { ContentButton } from "@/components/content/ContentButton";
import { Reco } from "@/components/content/ideas/Reco";
import { Recipe } from "@/components/content/ideas/Recipe";
import { List } from "@/components/content/ideas/List";
import { ModalWithText } from "@/components/utils/custom/ModalWithText";
import { CustomScrollView } from "@/components/utils/custom/ScrollView";
import { Content } from "@/interfaces/contentInterface";
import { ContentType, IdeaType } from "@/enums/enums";
import { formatImage } from "@/services/image.service";
import { getCloudinaryImageUrl } from "@/services/cloudinary";

interface IdeaProps {
    ideas: Content[];
    dayId: number;
}

export const Idea: React.FC<IdeaProps> = ({ ideas, dayId }) => {
    const [modalVisible, setModalVisible] = useState<boolean>(false);

    const backgroundImage = getCloudinaryImageUrl("se-regaler_mnonwh"); // se-divertir_xvdksq
    const [modalBackground, setModalBackground] = useState(backgroundImage);

    const [imageDimensions, setImageDimensions] = useState<{
        [key: string]: { width: number; height: number };
    }>({});

    const getmodalImage = (idea: Content) => {
        if (idea.content5 === IdeaType.Recipe) {
            const imageSource = idea.image
                ? getCloudinaryImageUrl(idea.image)
                : getCloudinaryImageUrl("se-divertir_xvdksq");

            setModalBackground(imageSource);
        } else {
            setModalBackground(backgroundImage);
        }
    };

    useEffect(() => {
        ideas.forEach((idea) => {
            if (idea.image) {
                const maxHeight = idea.content5 === IdeaType.Book ? 200 : 500;
                formatImage(
                    idea.dayNumber,
                    idea.image,
                    maxHeight,
                    setImageDimensions
                );
            }
            getmodalImage(idea);
        });
    }, [ideas]);

    return (
        <>
            <ContentButton
                ideas={ideas}
                setModalVisible={setModalVisible}
                dayId={dayId}
                backgroundImage={backgroundImage}
            />

            {ideas.map((idea) => (
                <ModalWithText
                    isVisible={modalVisible}
                    onClose={() => setModalVisible(false)}
                    contentType={ContentType.Idea}
                    backgroundImage={modalBackground}
                    key={idea.id}
                >
                    <CustomScrollView>
                        <View>
                            {idea.content5 === IdeaType.Recipe && (
                                <Recipe content={idea} />
                            )}

                            {idea.content5 === IdeaType.List && (
                                <List idea={idea} />
                            )}

                            {idea.content5 !== IdeaType.Recipe &&
                                idea.content5 !== IdeaType.List && (
                                    <Reco
                                        idea={idea}
                                        imageWidth={
                                            imageDimensions[idea.dayNumber]
                                                ?.width
                                        }
                                        imageHeight={
                                            imageDimensions[idea.dayNumber]
                                                ?.height
                                        }
                                    />
                                )}
                        </View>
                    </CustomScrollView>
                </ModalWithText>
            ))}
        </>
    );
};
