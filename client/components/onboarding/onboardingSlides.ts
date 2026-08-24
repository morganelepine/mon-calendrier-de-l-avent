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
    backgroundColor: Colors.autumnRed,
    title: "This is Halloween",
    body: "C'est nouveau !\n\nTout au long du mois d'octobre, l'application se met aux couleurs de l'automne et d'Halloween !\n\nAu programme : un bingo spécial et un calendrier rempli de petites surprises automnales.\n\nPas d'inquiétude : l'ambiance de Noël reviendra le 1er novembre et le calendrier de l'avent démarrera le 1er décembre.",
};

export const NOTIFICATIONS_NOTICE_SLIDE: OnboardingSlideContent = {
    imageId: "24-_txjyhs",
    backgroundColor: Colors.red,
    title: "Ne rate plus une case !",
    body: "Si tu ouvres la case du jour en retard, les lutins oublieront peut-être de t'attribuer des points...\n\n Alors active les notifications pour recevoir un petit rappel chaque matin de décembre !",
};

export const ONBOARDING_SLIDES: OnboardingSlideContent[] = [
    {
        imageId: "8-_lb0twh",
        backgroundColor: Colors.blue,
        title: "Bienvenue dans la magie de Noël !",
        body: "Pour patienter jusqu'à Noël, ouvre chaque jour de décembre une case du calendrier et découvre 4 contenus :\n\n~ une histoire pour te divertir  ~\n\n~ une anecdote pour t'instruire ~\n\n~ une idée pour t'inspirer ~\n\n~ un mini-jeu pour t'amuser ~",
    },
    {
        imageId: "23-_zgpzq7",
        backgroundColor: Colors.green,
        body: "Ton nom de lutin·e de Noël te permettra de comparer ton score avec celui des autres joueur·euse·s dans le classement général.\n\nOuvre la case du jour, explore ses contenus et répond correctement aux jeux pour accumuler des points !\n\nTu trouveras toutes les règles dans l'onglet Infos.",
        showUsername: true,
    },
    NOTIFICATIONS_NOTICE_SLIDE,
    ...(isOctober ? [HALLOWEEN_NOTICE_SLIDE] : []),
];
