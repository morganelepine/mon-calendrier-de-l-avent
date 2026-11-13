import { AbsoluteFill } from "remotion";
import { Colors } from "../theme";
import { Snow } from "./Snow";

export const Background: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <AbsoluteFill
        style={{
            background: `radial-gradient(circle at 50% 35%, ${Colors.blue} 0%, ${Colors.darkBlue} 75%)`,
        }}
    >
        <Snow />
        {children}
    </AbsoluteFill>
);
