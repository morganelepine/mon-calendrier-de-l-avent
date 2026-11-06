import { Platform } from "react-native";
import { Challenge } from "@/interfaces/challengeInterface";

const ALL_CHALLENGES: Challenge[] = [
    {
        id: 1,
        image: "2_shko2c",
        hint: "Certains avenirs tiennent dans une boule de verre… et réservent de belles histoires.",
        title: "La boule de cristal",
        reason: "Consulter le programme des téléfilms",
    },
    {
        id: 2,
        image: "8_dts07a",
        hint: "Les étoiles n'oublient jamais ceux qui les ont fait briller.",
        title: "Le murmure des étoiles",
        reason: "Ouvrir l'écran des remerciements",
    },
    {
        id: 3,
        image: "4_syk4ba",
        hint: "Les plus beaux rêves sont parfois ceux que l'on prend le temps de découvrir jusqu'au bout.",
        title: "Le grimoire des lutins",
        reason: "Regarder toutes les recommandations d'un jour",
    },
    {
        id: 4,
        image: "snowflake_ucgrhg",
        hint: "Certaines portes n'apparaissent qu'à ceux qui savent insister.",
        title: "La clé du grand Nord",
        reason: "Taper 3 fois sur une case encore fermée",
    },
    {
        id: 5,
        image: "1_dvecfx",
        hint: "Une lumière partagée brille toujours un peu plus fort.",
        title: "Le messager de Noël",
        reason: "Partager le décompte",
        nativeOnly: true,
    },
    {
        id: 6,
        image: "10_jnklib",
        hint: "La magie se cache parfois dans ce qui reste quand tout semble terminé.",
        title: "L'écho des grelots",
        reason: "Écouter la chanson du jour jusqu'à la fin",
    },
    {
        id: 7,
        image: "9_s3yxkq",
        hint: "Ce que l'on voit dans le miroir n'est pas toujours ce que l'on croit.",
        title: "Le miroir des âmes",
        reason: "Partager son profil à un quiz",
        nativeOnly: true,
    },
    {
        id: 8,
        image: "6_czpt8m",
        hint: "Quand le monde sommeille encore, la magie ne dort jamais.",
        title: "Une étincelle dans la nuit",
        reason: "Ouvrir l'application entre 00:31 et 7h",
    },
    {
        id: 9,
        image: "3_neb8cm",
        hint: "Certains nombres possèdent un pouvoir que les autres ignorent.",
        title: "Le nombre magique",
        reason: "Atteindre 10000 points au 2048",
    },
    {
        id: 10,
        image: "5_g1slun",
        hint: "Entre deux jours se glisse parfois un peu de magie.",
        title: "Le passage enchanté",
        reason: "Ouvrir une case dans les 30 premières minutes après minuit",
    },
    {
        id: 11,
        image: "7_dyt9mu",
        hint: "Le hasard fait parfois très bien les choses.",
        title: "Les pas dans la neige",
        reason: "Cocher 7 cases d'un bingo",
    },
    {
        id: 12,
        image: "11_xarana",
        hint: "Une promesse suffit parfois à ouvrir les portes d'un monde merveilleux.",
        title: "Le trésor de la Mère Noël",
        reason: "Acheter La Hotte Magique",
        nativeOnly: true,
    },
];

const isPwa = Platform.OS === "web";

export const CHALLENGES = isPwa
    ? ALL_CHALLENGES.filter((challenge) => !challenge.nativeOnly)
    : ALL_CHALLENGES;

// Keep in sync with server/src/controllers/score.controller.ts
export const CHALLENGE_POINTS = isPwa ? 20 : 15;
