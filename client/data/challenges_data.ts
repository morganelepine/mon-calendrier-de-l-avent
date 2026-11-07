import { Platform } from "react-native";
import { Challenge } from "@/interfaces/challengeInterface";
import { getCloudinaryImageUrl } from "@/services/cloudinary.service";

export const CHALLENGE_CLOSED_DAY_TAPS = 3;
export const CHALLENGE_2048_SCORE = 10000;
export const CHALLENGE_BINGO_CELLS = 7;

const ALL_CHALLENGES: Challenge[] = [
    {
        id: 1,
        image: "1_hsdbiz",
        hint: "L'avenir appartient à ceux qui croient à la beauté de leurs rêves.",
        author: "Eleanor Roosevelt",
        title: "La boule de cristal",
        reason: "Consulter le programme des téléfilms de Noël",
    },
    {
        id: 2,
        image: "2_a2opkd",
        hint: "La reconnaissance est la mémoire du cœur.",
        author: "Hans Christian Andersen",
        title: "Le murmure des étoiles",
        reason: "Ouvrir l'écran des remerciements",
    },
    {
        id: 3,
        image: "3_bg4xjn",
        hint: "La fin couronne l’œuvre.",
        author: "Proverbe français",
        title: "Le grimoire des lutins",
        reason: 'Regarder toutes les recos de la rubrique "Se divertir"',
    },
    {
        id: 4,
        image: "4_mmezxp",
        hint: "Toc Toc Toc ?",
        title: "La clé du grand Nord",
        reason: "Taper 3 fois sur une case du calendrier encore fermée",
    },
    {
        id: 5,
        image: "5_hw0ogb",
        hint: "Il n’est pas d’hiver sans neige, de printemps sans soleil, et de joie sans être partagée.",
        author: "Proverbe serbe",
        title: "Le messager de Noël",
        reason: "Partager le décompte",
        nativeOnly: true,
    },
    {
        id: 6,
        image: "6_lssgjs",
        hint: "Ainsi vient la neige après le feu, et même les dragons ont une fin.",
        author: "Bilbo le Hobbit",
        title: "L'écho des grelots",
        reason: "Écouter la chanson du jour en entier",
    },
    {
        id: 7,
        image: "7_jcjnqs",
        hint: "Le bonheur est la seule chose qui se double si on le partage.",
        author: "Albert Schweitzer",
        title: "Le miroir des âmes",
        reason: "Partager son profil à un quiz",
        nativeOnly: true,
    },
    {
        id: 8,
        image: "8_ewcvgh",
        hint: "Quand la neige est venue, pendant la nuit, tendre sans bruit son épais tapis sur la terre, on pousse une légère exclamation de joie et de surprise.",
        author: "Émile Zola",
        title: "Une étincelle dans la nuit",
        reason: "Ouvrir l'application avant 7h du matin",
    },
    {
        id: 9,
        image: "9_lllls0",
        hint: "Rien ne se perd,\r\nrien ne se crée,\r\ntout se transforme.",
        author: "Lavoisier",
        title: "Le nombre magique",
        reason: "Atteindre 10 000 points au 2048",
    },
    {
        id: 10,
        image: "10_zoh56d",
        hint: "Je m'étais toujours juré de ne pas m'endormir la veille de Noël.\r\nJe voulais entendre caracoler le renne sur le toit et me trouver en bas devant la cheminée pour serrer la main du Père Noël.",
        author: "Truman Capote",
        title: "Le passage enchanté",
        reason: "Ouvrir une case dans les 30 premières minutes après minuit",
    },
    {
        id: 11,
        image: "11_ufj6w3",
        hint: "Petit à petit, l'oiseau fait son nid.",
        author: "Proverbe français",
        title: "Les pas dans la neige",
        reason: "Cocher 7 cases d'un bingo",
    },
    {
        id: 12,
        image: "12_ak2xru",
        hint: "Fais de ta vie un rêve, et d'un rêve, une réalité.",
        author: "Antoine de Saint-Exupéry",
        title: "Le trésor de la Mère Noël",
        reason: "Débloquer La Hotte Magique",
        nativeOnly: true,
    },
];

const isPwa = Platform.OS === "web";

export const CHALLENGES = isPwa
    ? ALL_CHALLENGES.filter((challenge) => !challenge.nativeOnly)
    : ALL_CHALLENGES;

// Keep in sync with server/src/controllers/score.controller.ts
export const CHALLENGE_POINTS = isPwa ? 20 : 15;

export const getChallengeImageUrls = (): string[] =>
    CHALLENGES.map(({ image }) => getCloudinaryImageUrl(image));
