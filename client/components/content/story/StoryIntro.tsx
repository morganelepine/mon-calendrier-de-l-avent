import { StyleSheet, View } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ContentScreenWrapper } from "@/components/utils/custom/ContentScreenWrapper";
import { getCloudinaryImageUrl } from "@/services/cloudinary";
import { Content } from "@/interfaces/contentInterface";

interface StoryIntroProps {
    story: Content;
    dayId: number;
}

export const StoryIntro: React.FC<StoryIntroProps> = ({ story, dayId }) => {
    return (
        <ContentScreenWrapper
            contentType={story.type}
            backgroundImage={getCloudinaryImageUrl("s-instruire_xybqas")}
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

                <ThemedText type="contentSubtitle" style={{ marginTop: 20 }}>
                    Le jeu littéraire
                </ThemedText>
                <ThemedText>
                    Cette année, un petit jeu se glisse entre les lignes. Dans
                    chacune des trois histoires, des indices ont été disséminés
                    qui mènent tous au titre d’un livre (pour les deux
                    premières) ou d'un film (pour la troisième). Saurez-vous les
                    retrouver ?
                </ThemedText>

                <ThemedText>
                    Vous pourrez tenter une réponse à tout moment en bas de la
                    page de l'histoire du jour en cliquant sur "J'ai trouvé la
                    solution du jeu !".
                </ThemedText>

                <ThemedText>
                    50 points bonus seront attribués pour chaque titre trouvé !
                    Attention, vous ne pourrez tenter votre chance qu'une fois
                    pour chaque histoire...
                </ThemedText>

                <ThemedText>
                    Je vous donne alors rendez-vous demain pour le début de la
                    première histoire !
                </ThemedText>
            </View>
        </ContentScreenWrapper>
    );
};

const styles = StyleSheet.create({});
