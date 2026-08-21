import { View } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ContentScreenWrapper } from "@/components/utils/custom/ContentScreenWrapper";
import { Content } from "@/interfaces/contentInterface";

interface StoryIntroProps {
    story: Content;
    dayId: number;
}

export const StoryIntro: React.FC<StoryIntroProps> = ({ story, dayId }) => {
    return (
        <ContentScreenWrapper
            contentType={story.type}
            backgroundImage={"s-instruire_xybqas"}
            dayId={dayId}
        >
            <View style={{ gap: 8 }}>
                <ThemedText>
                    Cette année, trois nouvelles vous accompagneront jusqu'à
                    Noël !
                </ThemedText>
                <ThemedText>
                    Trois histoires, trois ambiances, trois façons de voir
                    décembre et ses lumières.
                </ThemedText>
                <ThemedText>
                    Et toujours un chapitre par jour pour savourer l’attente et
                    la magie de Noël.
                </ThemedText>

                <ThemedText>
                    Je vous donne alors rendez-vous demain pour le début de la
                    première histoire !
                </ThemedText>
            </View>
        </ContentScreenWrapper>
    );
};
