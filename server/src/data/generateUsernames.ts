const maleNames = [
    "Ange",
    "Biscuit",
    "Bonbon",
    "Cadeau",
    "Chocolat",
    "Décembre",
    "Elfe",
    "Flocon",
    "Givre",
    "Grelot",
    "Hiver",
    "Houx",
    "Jouet",
    "Lutin",
    "Minuit",
    "Pin",
    "Poinsettia",
    "Renne",
    "Rêve",
    "Ruban",
    "Santon",
    "Sapin",
    "Sucrerie",
    "Traîneau",
    "Village",
];

const femaleNames = [
    "Boîte",
    "Boule",
    "Bûche",
    "Cannelle",
    "Cheminée",
    "Clémentine",
    "Clochette",
    "Couronne",
    "Douceur",
    "Épice",
    "Étincelle",
    "Étoile",
    "Féérie",
    "Glace",
    "Guirlande",
    "Hotte",
    "Joie",
    "Lumière",
    "Magie",
    "Maison",
    "Mélodie",
    "Neige",
    "Nuit",
    "Orange",
    "Papillote",
    "Surprise",
];

const maleAdjectives = [
    "Argenté",
    "Blanc",
    "Bleu",
    "Brillant",
    "Doré",
    "Doux",
    "Enchanté",
    "Enneigé",
    "Épicé",
    "Étincelant",
    "Étoilé",
    "Gelé",
    "Glacé",
    "Féérique",
    "Festif",
    "Givré",
    "Gourmand",
    "Illuminé",
    "Joli",
    "Joyeux",
    "Lumineux",
    "Magique",
    "Mélodieux",
    "Mignon",
    "Mystérieux",
    "Rouge",
    "Sucré",
    "Vert",
];

const femaleAdjectives = [
    "Argentée",
    "Blanche",
    "Bleue",
    "Brillante",
    "Dorée",
    "Douce",
    "Enchantée",
    "Enneigée",
    "Épicée",
    "Étincelante",
    "Étoilée",
    "Gelée",
    "Glacée",
    "Féérique",
    "Festive",
    "Givrée",
    "Gourmande",
    "Illuminée",
    "Jolie",
    "Joyeuse",
    "Lumineuse",
    "Magique",
    "Mélodieuse",
    "Mignonne",
    "Mystérieuse",
    "Rouge",
    "Sucrée",
    "Verte",
];

const allUsernames = generateUsernames(
    maleNames,
    femaleNames,
    maleAdjectives,
    femaleAdjectives
);

function generateUsernames(
    maleNames: string[],
    femaleNames: string[],
    maleAdjectives: string[],
    femaleAdjectives: string[]
) {
    const usernames = [];

    for (const nom of maleNames) {
        for (const adj of maleAdjectives) {
            usernames.push(`${nom}_${adj}`);
        }
    }

    for (const nom of femaleNames) {
        for (const adj of femaleAdjectives) {
            usernames.push(`${nom}_${adj}`);
        }
    }

    return usernames;
}
