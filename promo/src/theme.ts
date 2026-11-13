import { loadFont } from "./loadFont";

// Mirrors client/constants/Colors.ts (not imported: that file depends on Expo date logic).
export const Colors = {
    snow: "#f7f5f6",
    blue: "#0b2956",
    darkBlue: "#010f23",
    green: "#116459",
    red: "#a0222d",
    gold: "#e9be1a",
    goldLight: "#f0e5d8",
    beige: "#e8ddce",
};

export const Fonts = {
    title: loadFont("FreightNeoBold", "fonts/FreightNeo/Fonts/FreightNeo W03 Bold.ttf"),
    body: loadFont("Poppins", "fonts/Poppins/Poppins-Regular.ttf"),
    bodyBold: loadFont("PoppinsBold", "fonts/Poppins/Poppins-SemiBold.ttf"),
};

export const VIDEO = { width: 1080, height: 1920, fps: 30 };

// Instagram/TikTok overlay their UI on the top and bottom of the video.
export const SAFE_MARGIN = { top: 280, bottom: 380, x: 80 };
