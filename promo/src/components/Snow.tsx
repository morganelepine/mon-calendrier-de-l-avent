import { AbsoluteFill, random, useCurrentFrame, useVideoConfig } from "remotion";
import { Colors } from "../theme";

const FLAKES = Array.from({ length: 70 }, (_, i) => ({
    x: random(`x-${i}`),
    y: random(`y-${i}`),
    size: 4 + random(`s-${i}`) * 10,
    speed: 1.5 + random(`v-${i}`) * 3,
    sway: random(`w-${i}`) * Math.PI * 2,
}));

export const Snow: React.FC = () => {
    const frame = useCurrentFrame();
    const { width, height } = useVideoConfig();

    return (
        <AbsoluteFill>
            {FLAKES.map((f, i) => {
                const y = (f.y * height + frame * f.speed) % height;
                const x = f.x * width + Math.sin(frame / 30 + f.sway) * 20;
                return (
                    <div
                        key={i}
                        style={{
                            position: "absolute",
                            left: x,
                            top: y,
                            width: f.size,
                            height: f.size,
                            borderRadius: "50%",
                            backgroundColor: Colors.snow,
                            opacity: 0.35 + f.size / 30,
                        }}
                    />
                );
            })}
        </AbsoluteFill>
    );
};
