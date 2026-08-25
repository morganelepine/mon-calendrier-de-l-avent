import { Colors } from "@/constants/Colors";
import { isOctober } from "@/constants/Dates";

export type OnboardingSlideContent = {
    imageId: string;
    backgroundColor: string;
    title?: string;
    body: string;
    showUsername?: boolean;
};

export const HALLOWEEN_NOTICE_SLIDE: OnboardingSlideContent = {
    imageId: "27_dhdnjt",
    backgroundColor: Colors.autumnGold,
    title: "C'est nouveau !",
    body: "Tout au long du mois d'octobre, l'application se met aux couleurs de l'automne et d'Halloween !\n\nAu programme : un bingo spécial et un calendrier rempli de petites surprises automnales.\n\nPas d'inquiétude : l'ambiance de Noël reviendra le 1er novembre et le calendrier de l'avent démarrera le 1er décembre.",
};

export const NOTIFICATIONS_NOTICE_SLIDE: OnboardingSlideContent = {
    imageId: "24-_txjyhs",
    backgroundColor: Colors.red,
    title: "Ne ratez plus une case !",
    body: `Si vous ouvrez la case du jour en retard, les lutins oublieront peut-être de vous attribuer des points...\n\n Alors activez les notifications pour recevoir un petit rappel chaque matin ${isOctober ? "d'octobre et de décembre" : "de décembre"} !`,
};

export const ONBOARDING_SLIDES: OnboardingSlideContent[] = [
    {
        imageId: "8-_lb0twh",
        backgroundColor: Colors.blue,
        title: "Bienvenue dans la magie de Noël !",
        body: "Pour patienter jusqu'à Noël, ouvrez chaque jour de décembre une case du calendrier et découvrez 4 contenus :\n\n~ une histoire pour se divertir  ~\n\n~ une anecdote pour s'instruire ~\n\n~ une idée pour s'inspirer ~\n\n~ un mini-jeu pour s'amuser ~",
    },
    {
        imageId: "23-_zgpzq7",
        backgroundColor: Colors.green,
        body: "Votre nom de lutin·e de Noël vous permettra de comparer votre score avec celui des autres joueur·euse·s dans le classement général.\n\nOuvrez la case du jour, explorez ses contenus et répondez correctement aux jeux pour accumuler des points !\n\nVous trouverez toutes les règles dans l'onglet Infos.",
        showUsername: true,
    },
    ...(isOctober ? [HALLOWEEN_NOTICE_SLIDE] : []),
    NOTIFICATIONS_NOTICE_SLIDE,
];
