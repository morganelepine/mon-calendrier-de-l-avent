import { Colors } from "@/constants/Colors";

export type OnboardingSlideContent = {
    imageId: string;
    backgroundColor: string;
    title?: string;
    body: string;
    showUsername?: boolean;
};

export const ONBOARDING_SLIDES: OnboardingSlideContent[] = [
    {
        imageId: "8-_lb0twh",
        backgroundColor: Colors.blue,
        title: "Bienvenue dans la magie de Noël !",
        body: "Pour patienter jusqu'à Noël, ouvre chaque jour une case du calendrier et découvre 4 contenus :\n\n~ une histoire pour te divertir  ~\n\n~ une anecdote pour t'instruire ~\n\n~ une idée pour t'inspirer ~\n\n~ un mini-jeu pour t'amuser ~",
    },
    {
        imageId: "23-_zgpzq7",
        backgroundColor: Colors.green,
        body: "Ton nom de lutin·e de Noël te permettra de comparer ton score avec celui des autres joueur·euse·s dans le classement général.\n\nOuvre la case du jour, explore ses contenus et répond correctement aux jeux pour accumuler des points !\n\nTu trouveras toutes les règles dans l'onglet Infos.",
        showUsername: true,
    },
];
