import { router } from "expo-router";
import { ModalWithCloseButton } from "@/components/utils/custom/ModalWithCloseButton";
import { ThemedText } from "@/components/ThemedText";
import { CustomButton } from "@/components/utils/buttons/Button";
import { useGoalForCurrentSeason } from "@/hooks/useGame2048";
import { PURCHASES_SUPPORTED, usePremium } from "@/contexts/PremiumContext";
import { MAX_TIER, FREE_MAX_TIER } from "@/utils/games2048/engine";
import { Theme } from "@/constants/Colors";

interface Props {
    visible: boolean;
    onClose: () => void;
}

export const Game2048WinModal = ({ visible, onClose }: Props) => {
    const goal = useGoalForCurrentSeason();
    const { isPremium } = usePremium();
    const showPremiumOffer = PURCHASES_SUPPORTED && !isPremium;

    return (
        <ModalWithCloseButton visible={visible} onRequestClose={onClose}>
            <ThemedText type="modalTitle">Bravo !</ThemedText>
            <ThemedText type="sectionText">
                Vous avez réussi à atteindre {goal} Vous pouvez continuer à
                jouer pour améliorer votre score.
            </ThemedText>
            {showPremiumOffer && (
                <>
                    <ThemedText type="sectionText">
                        Envie d'aller plus loin ? La Hotte Magique débloque{" "}
                        {MAX_TIER - FREE_MAX_TIER} niveaux supplémentaires !
                    </ThemedText>
                    <CustomButton
                        color={Theme.orangeToGreen}
                        onPress={() => {
                            onClose();
                            router.push("/informations/premium");
                        }}
                    >
                        Découvrir la Hotte Magique
                    </CustomButton>
                </>
            )}
        </ModalWithCloseButton>
    );
};
