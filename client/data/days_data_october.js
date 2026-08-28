// Grille du calendrier d'Halloween/automne

const HALLOWEEN_IMAGES = [
    "30_eznoas",
    "2_ughd7g",
    "3_qk2ccx",
    "4_qxii6a",
    "5_ivzrzp",
    "6_mf818l",
    "21_qz2fgx",
    "8_c0bvor",
    "15_d8mctc",
    "17_zymuuh",
    "11_frx2mr",
    "16_sx1i31",
    "13_xixisr",
    "10_dl57lr",
    "9_mtcauc",
    "18_zngbxq",
    "14_su1gib",
    "19_wsyl9d",
    "1_tmwyc9",
    "20_suugih",
    "7_xxrl6m",
    "22_bidqdm",
    "23_wj1je8",
    "24_uhtor7",
    "25_oqbgzj",
    "26_s5vptg",
    "29_kryz4s",
    "28_ivokxx",
    "27_dhdnjt",
    "12_sqmpxt",
    "31_zjs3yb",
];

const HALLOWEEN_MUSICS = [
    "https://res.cloudinary.com/deauthz29/video/upload/Dmitry-Taras-Halloween_gacrmx.mp3",
    "https://res.cloudinary.com/deauthz29/video/upload/Mikhail-Smusev-Halloween_jqgdtd.mp3",
];

const QUOTES = [
    {
        text: "L'automne raconte à la terre les feuilles qu'elle a prêtées à l'été.",
        author: "Georg Christoph Lichtenberg",
        source: "",
    },
    {
        text: "Il y a quelque chose du printemps dans l'automne, et les derniers parfums de l'année ressemblent parfois à ses premières émanations.",
        author: "Alexandre Dumas",
        source: "Pauline",
    },
    {
        text: "L'automne est un andante mélancolique et gracieux qui prépare admirablement le solennel adagio de l'hiver.",
        author: "George Sand",
        source: "François le Champi",
    },
    {
        text: "Les nouvelles sont comme les feuilles d'automne. Le vent qui les porte les malmène.",
        author: "Christian Bobin",
        source: "Tout le monde est occupé",
    },
    {
        text: "L'arbre se sauve en faisant tomber ses feuilles.",
        author: "Pierre Jean Jouve",
        source: "",
    },
    {
        text: "L'automne est une demeure d'or et de pluie.",
        author: "Jacques Chessex",
        source: "",
    },
    {
        text: "Triste est l'automne pour celui qui ne sait l'égayer.",
        author: "Céline Blondeau",
        source: "",
    },
    {
        text: "Ce qu'il y a parfois de beau avec l'automne, c'est lorsque le matin se lève après une semaine de pluie, de vent et brouillard et que tout l'espace, brutalement, semble se gorger de soleil.",
        author: "Victor-Lévy Beaulieu",
        source: "",
    },
    {
        text: "La vieillesse embellit tout : elle a l'effet du soleil couchant dans les beaux arbres d'octobre.",
        author: "Maurice Chapelan",
        source: "",
    },
    {
        text: "L'automne est un deuxième printemps où chaque feuille est une fleur.",
        author: "Albert Camus",
        source: "",
    },
    {
        text: "La beauté de l’automne est un poème écrit par la nature.",
        author: "Charles Baudelaire",
        source: "",
    },
    {
        text: "L'automne est le printemps de l'hiver.",
        author: "Henri de Toulouse-Lautrec",
        source: "",
    },
    {
        text: "Automne en fleurs\nHiver plein de rigueur.",
        author: "Dicton",
        source: "",
    },
    {
        text: "Sous-bois d'automne:\nsymphonie pour bois et cuivre.",
        author: "Sylvain Tesson",
        source: "Aphorismes sous la lune et autres pensées sauvages",
    },
    {
        text: "L'automne fait les bruits froissés\nDe nos tumultueux baisers...",
        author: "Charles Cros",
        source: "",
    },
    {
        text: "Les arbres jettent l'or de leurs feuilles par les fenêtres de l'automne.",
        author: "Sylvain Tesson",
        source: "Dans les forêts de Sibérie",
    },
    {
        text: "Les sanglots longs des violons de l'automne blessent mon coeur d'une langueur monotone.",
        author: "Paul Verlaine",
        source: "Chanson d'automne",
    },
    {
        text: "L'automne, l'automne merveilleux, mêlait son or et sa pourpre aux dernières verdures restées vives, comme si des gouttes de soleil fondu avaient coulé du ciel dans l'épaisseur des bois.",
        author: "Guy de Maupassant",
        source: "Contes de la bécasse",
    },
    {
        text: "Pourquoi moi ? doit se dire en tombant la première feuille qu'un arbre lâche à l'automne.",
        author: "Grégoire Lacroix",
        source: "Les euphorismes de Grégoire",
    },
    {
        text: "Attends-moi de l'autre côté de l'année: tu me rencontreras comme un éclair étendu au bord de l'automne.",
        author: "Octavio Paz",
        source: "Liberté sur parole",
    },
    {
        text: "Le timide a peur avant le danger, le lâche au milieu du danger, le courageux après le danger.",
        author: "Jean-Paul Richter",
        source: "",
    },
    {
        text: "Les soupçons dans les pensées sont comme les chauves-souris parmi les oiseaux.",
        author: "Francis Bacon",
        source: "Essais",
    },
    {
        text: "Il y a le peureux qui regarde sous son lit, et le peureux qui n’ose même pas regarder sous son lit.",
        author: "Jules Renard",
        source: "Journal",
    },
    {
        text: "Dis-moi qui tu hantes, et je te dirai qui tu es.",
        author: "Miguel de Cervantès",
        source: "Don Quichotte",
    },
    {
        text: "Elles sont bien noires, les pensées des nuits blanches.",
        author: "Edmond et Jules de Goncourt",
        source: "",
    },
    {
        text: "Est-ce que je crois aux fantômes ? Non, mais j’en ai peur.",
        author: "Marie du Deffand",
        source: "",
    },
    {
        text: "Une bonne terreur, de temps en temps, vous remet les idées en perspective.",
        author: "Elisabeth Vonarburg",
        source: "",
    },
    {
        text: "La nuit est propice à la réflexion, au silence, à la peur aussi. C'est dans l'obscurité qu'on dort, qu'on se tait, qu'on voit les fantômes.",
        author: "Simone Piuze",
        source: "",
    },
    {
        text: "Si la nuit est noire, c'est pour que rien ne puisse nous distraire de nos cauchemars.",
        author: "Bill Watterson",
        source: "Allez, on se tire !",
    },
    {
        text: "Quand on a faim, une citrouille vaut mieux qu'un carrosse.",
        author: "Thérèse Amiel",
        source: "",
    },
    {
        text: "Halloween : un séjour magique et mystérieux tout plein de surprises où, parmi des friandises et des astuces, la peur et l'horreur se transforment en joie et jouent.",
        author: "Jean Paul Malfatti",
        source: "",
    },
];

const VISUAL_ORDER = [
    26, 15, 9, 23, 4, 7, 21, 6, 25, 14, 19, 1, 30, 12, 13, 31, 22, 8, 24, 27, 3,
    17, 5, 16, 18, 11, 29, 2, 28, 10, 20,
];

const doubleCells = new Set([14, 17, 20, 26, 31]);

const GREEN_DARK = "#6e9346"; // autumnGreenDark
const GREEN = "#a7a84a"; // autumnGreen
const RED = "#de562e"; // autumnRed
const GOLD = "#d5930b"; // autumnGold
const YELLOW = "#e5b514"; // autumnYellow

const CELL_COLORS = [
    // Ligne 1 : 1(double), 2, 3
    RED,
    GOLD,
    GREEN,
    // Ligne 2 : 4, 5, 6, 7
    GREEN,
    YELLOW,
    GREEN_DARK,
    GOLD,
    // Ligne 3 : 8, 9, 10(double)
    RED,
    GOLD,
    GREEN,
    // Ligne 4 : 11, 12, 13, 14
    YELLOW,
    GREEN_DARK,
    GOLD,
    RED,
    // Ligne 5 : 15, 16(double), 17
    RED,
    YELLOW,
    GREEN_DARK,
    // Ligne 6 : 18, 19, 20, 21
    GREEN_DARK,
    GREEN,
    RED,
    YELLOW,
    // Ligne 7 : 22(double), 23, 24
    GOLD,
    GREEN,
    GREEN_DARK,
    // Ligne 8 : 25, 26, 27, 28
    GREEN,
    GREEN_DARK,
    RED,
    GOLD,
    // Ligne 9 : 29, 30, 31(double)
    YELLOW,
    RED,
    GREEN_DARK,
];

export const octoberDaysArray = VISUAL_ORDER.map((dayNumber, index) => {
    const image = HALLOWEEN_IMAGES[dayNumber - 1];

    return {
        dayNumber,
        isOpen: false,
        background: image,
        color: CELL_COLORS[index],
        textColor: "white",
        image,
        aspectRatio: doubleCells.has(dayNumber) ? 2.4 : 1.2,
        quote: QUOTES[dayNumber - 1].text,
        quoteAuthor: QUOTES[dayNumber - 1].author,
        quoteSource: QUOTES[dayNumber - 1].source,
        music: HALLOWEEN_MUSICS[(dayNumber - 1) % HALLOWEEN_MUSICS.length],
    };
});
