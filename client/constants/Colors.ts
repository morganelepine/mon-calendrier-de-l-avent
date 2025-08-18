/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = "#165d4b";
const tintColorDark = "#eee6d9";

export const Colors = {
    snow: "#f7f5f6",
    blue: "#0b2956",
    darkBlue: "#010f23",
    green: "#116459", // 136F63
    darkGreen: "#0b2e25",
    red: "#a0222d", // b52936
    pink: "#ffc4c4",
    gold: "#d6ae72",

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
