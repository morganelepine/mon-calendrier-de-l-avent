/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import { isOctober } from "@/constants/Dates";

const tintColorLight = "#165d4b";
const tintColorDark = "#eee6d9";

export const Colors = {
    snow: "#f7f5f6",
    lightBlue: "#A1C6EA",
    blue: "#0b2956",
    darkBlue: "#010f23",
    lightGreen: "#87A330",
    green: "#116459", // 136F63
    darkGreen: "#0b2e25",
    red: "#a0222d", // b52936
    pink: "#FAB3A9",
    darkPink: "#c25f5f",
    gold: "#e9be1a",
    goldLight: "#f0e5d8",
    disabled: "#e5e5e5",
    disabledText: "#92959a",
    black: "#1a211f",

    autumnGreenDark: "#6e9346",
    autumnGreen: "#a7a84a",
    autumnRed: "#de562e",
    autumnOrange: "#f4903b",
    autumnGold: "#d5930b",
    autumnYellow: "#e5b514",

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

export const Theme = {
    tint: isOctober ? Colors.autumnRed : Colors.blue,
    surface: isOctober ? Colors.autumnGold : Colors.blue,
    deep: isOctober ? Colors.black : Colors.darkBlue,
    green: isOctober ? Colors.autumnRed : Colors.green,
    red: isOctober ? Colors.autumnRed : Colors.red,
    header: isOctober ? Colors.autumnGreenDark : Colors.green,
};
