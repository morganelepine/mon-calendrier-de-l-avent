/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import { isHalloween } from "@/constants/Dates";

const tintColorLight = "#165d4b";
const tintColorDark = "#eee6d9";

export const Colors = {
    snow: "#f7f5f6",
    lightBlue: "#A1C6EA",
    blue: "#0b2956",
    darkBlue: "#010f23",
    lightGreen: "#3f8f29",
    green: "#116459", // 136F63
    darkGreen: "#0b2e25",
    red: "#a0222d", // b52936
    pink: "#FAB3A9",
    darkPink: "#c25f5f",
    gold: "#e9be1a",
    goldLight: "#f0e5d8",
    disabled: "#e5e5e5",
    disabledText: "#92959a",
    black: "#232323",
    orange: "#d95f1b",

    light: {
        text: "#11181C",
        background: "#f7f5f6",
        tint: tintColorLight,
        icon: "#687076",
        tabIconDefault: "#687076",
        tabIconSelected: tintColorLight,
    },

    dark: {
        text: "#ECEDEE",
        background: "black",
        tint: tintColorDark,
        icon: "#f7f5f6",
        tabIconDefault: "#f7f5f6",
        tabIconSelected: tintColorDark,
    },
};

/**
 * Palette "de saison".
 * - `tint` / `tintLight` : accents (icônes, tint de header, boutons, titres, bordures...) -> orange
 * - `surface` : grands aplats (fond plein écran type BlueBackground) -> noir
 * - `deep` : bleu foncé (texte de contenu, fonds sombres de header...) -> noir
 */
export const Theme = {
    tint: isHalloween ? Colors.orange : Colors.blue,
    tintLight: isHalloween ? Colors.orange : Colors.lightBlue,
    surface: isHalloween ? Colors.black : Colors.blue,
    deep: isHalloween ? Colors.black : Colors.darkBlue,
    green: isHalloween ? Colors.orange : Colors.green,
};
