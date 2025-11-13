import React, { useState, useEffect } from "react";
import { View } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { Reco } from "@/components/content/ideas/Reco";
import { Recipe } from "@/components/content/ideas/Recipe";
import { List } from "@/components/content/ideas/List";
import { ContentScreenWrapper } from "@/components/utils/custom/ContentScreenWrapper";
import { CustomScrollView } from "@/components/utils/custom/ScrollView";
import { Content } from "@/interfaces/contentInterface";
import { ContentType, IdeaType } from "@/enums/enums";
import { formatImage } from "@/services/image.service";
import { getCloudinaryImageUrl } from "@/services/cloudinary";
import { getContentsByDay } from "@/services/content.service";

export default function IdeaScreen() {
    const backgroundImage = getCloudinaryImageUrl("se-regaler_mnonwh"); // se-divertir_xvdksq
    const [modalBackground, setModalBackground] = useState(backgroundImage);

    const { id } = useLocalSearchParams<{ id: string }>();
    const dayId = parseInt(id, 10);

    const { ideas } = getContentsByDay(dayId) as { ideas: Content[] };

    const [imageDimensions, setImageDimensions] = useState<{
        [key: string]: { width: number; height: number };
    }>({});

    const getmodalImage = (idea: Content) => {
        if (idea.content5 === IdeaType.Recipe) {
            const imageSource = idea.media
                ? getCloudinaryImageUrl(idea.media)
                : getCloudinaryImageUrl("se-divertir_xvdksq");

            setModalBackground(imageSource);
        } else {
            setModalBackground(backgroundImage);
        }
    };

    useEffect(() => {
        for (const idea of ideas) {
            if (idea.listOfContents) {
                for (const content of idea.listOfContents) {
                    const maxHeight =
                        idea.content4 === IdeaType.Book || IdeaType.TvShow
                            ? 200
                            : 150;
                    formatImage(
                        idea.dayNumber,
                        content.image,
                        maxHeight,
                        setImageDimensions
                    );
                }
            }
            getmodalImage(idea);
        }
    }, []);

    return (
        <>
            {ideas.map((idea) => (
                <ContentScreenWrapper
                    contentType={ContentType.Idea}
                    backgroundImage={modalBackground}
                    key={idea.id}
                    dayId={dayId}
                >
                    <CustomScrollView>
                        <View>
                            {idea.content5 === IdeaType.Recipe && (
                                <Recipe content={idea} />
                            )}

                            {idea.content5 === IdeaType.List && (
                                <List
                                    idea={idea}
                                    imageWidth={
                                        imageDimensions[idea.dayNumber]?.width
                                    }
                                    imageHeight={
                                        imageDimensions[idea.dayNumber]?.height
                                    }
                                />
                            )}

                            {idea.content5 === IdeaType.Idea && (
                                <Reco
                                    idea={idea}
                                    imageWidth={
                                        imageDimensions[idea.dayNumber]?.width
                                    }
                                    imageHeight={
                                        imageDimensions[idea.dayNumber]?.height
                                    }
                                />
                            )}
                        </View>
                    </CustomScrollView>
                </ContentScreenWrapper>
            ))}
        </>
    );
}
