import React, { useState, useEffect } from "react";
import { View } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { Reco } from "@/components/content/ideas/Reco";
import { Recipe } from "@/components/content/ideas/Recipe";
import { List } from "@/components/content/ideas/List";
import { PersonalityQuiz } from "@/components/content/ideas/PersonalityQuiz";
import { Cards } from "@/components/content/ideas/Cards";
import { ContentScreenWrapper } from "@/components/utils/custom/ContentScreenWrapper";
import { Content } from "@/interfaces/contentInterface";
import { IdeaType } from "@/enums/enums";
import { formatImage } from "@/services/cloudinary.service";
import { getContentsByDay } from "@/services/contents/content.service";
import { isOctober } from "@/constants/Dates";

export default function IdeaScreen() {
    const backgroundImage = isOctober
        ? "pumpkin_spice_addict_tad9te"
        : "se-regaler_mnonwh";

    const { id } = useLocalSearchParams<{ id: string }>();
    const dayId = parseInt(id, 10);

    const [ideas, setIdeas] = useState<Content[]>([]);

    const [imageDimensions, setImageDimensions] = useState<{
        [key: string]: { width: number; height: number };
    }>({});

    useEffect(() => {
        getContentsByDay(dayId)
            .then((contents) => {
                setIdeas(contents.ideas);
                for (const idea of contents.ideas) {
                    if (!idea.listOfContents) continue;
                    if (idea.content4 === IdeaType.Video) continue;
                    const maxHeight =
                        idea.content4 === IdeaType.Book ? 200 : 150;
                    for (const content of idea.listOfContents) {
                        formatImage(
                            idea.dayNumber,
                            content.image,
                            maxHeight,
                            setImageDimensions,
                        );
                    }
                }
            })
            .catch(() => {});
    }, [dayId]);

    const getHeaderImage = (idea: Content): string => {
        if (idea.subType !== IdeaType.Recipe) return backgroundImage;
        return idea.media || "se-divertir_xvdksq";
    };

    return (
        <>
            {ideas.map((idea) => (
                <ContentScreenWrapper
                    typeTitle={idea.typeTitle}
                    backgroundImage={getHeaderImage(idea)}
                    topImage={
                        idea.subType === IdeaType.Recipe
                            ? idea.media
                            : undefined
                    }
                    key={idea.id}
                    dayId={dayId}
                >
                    <View>
                        {idea.subType === IdeaType.Recipe && (
                            <Recipe content={idea} />
                        )}

                        {idea.subType === IdeaType.List && (
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

                        {idea.subType === IdeaType.Idea && <Reco idea={idea} />}

                        {idea.subType === IdeaType.PersonalityQuiz && (
                            <PersonalityQuiz idea={idea} />
                        )}

                        {idea.subType === IdeaType.Cards && (
                            <Cards idea={idea} />
                        )}
                    </View>
                </ContentScreenWrapper>
            ))}
        </>
    );
}
