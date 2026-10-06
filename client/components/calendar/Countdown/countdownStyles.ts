import { TextStyle } from "react-native";
import { Colors } from "@/constants/Colors";

export const countdownTitleStyle: TextStyle = {
    fontFamily: "FreightNeoBold",
    letterSpacing: 0.4,
    textAlign: "center",
    color: Colors.snow,
};

// Shrinks a countdown text style, e.g. for the smaller settings previews.
export const scaleTextStyle = (style: TextStyle, scale: number): TextStyle =>
    scale === 1
        ? style
        : {
              ...style,
              fontSize: style.fontSize && style.fontSize * scale,
              letterSpacing: style.letterSpacing && style.letterSpacing * scale,
              marginTop:
                  typeof style.marginTop === "number"
                      ? style.marginTop * scale
                      : style.marginTop,
              marginBottom:
                  typeof style.marginBottom === "number"
                      ? style.marginBottom * scale
                      : style.marginBottom,
          };
