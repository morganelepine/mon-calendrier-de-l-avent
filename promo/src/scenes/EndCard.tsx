import { AbsoluteFill, Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { Colors, Fonts } from "../theme";

export const EndCard: React.FC<{ cta: string }> = ({ cta }) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const icon = spring({ frame, fps, config: { damping: 10 } });
    const text = interpolate(frame, [10, 25], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
    const button = spring({ frame: frame - 25, fps, config: { damping: 9 } });

    return (
        <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", textAlign: "center", gap: 50 }}>
            <Img src={staticFile("images/icon.png")} style={{ width: 340, height: 340, borderRadius: 76, transform: `scale(${icon})` }} />
            <div style={{ fontFamily: Fonts.title, fontSize: 96, lineHeight: 1.1, color: Colors.snow, opacity: text, padding: "0 80px" }}>
                Mon calendrier
                <br />
                de l'avent
            </div>
            <div
                style={{
                    fontFamily: Fonts.bodyBold,
                    fontSize: 56,
                    color: Colors.blue,
                    background: Colors.gold,
                    padding: "24px 56px",
                    borderRadius: 999,
                    transform: `scale(${button})`,
                }}
            >
                {cta}
            </div>
        </AbsoluteFill>
    );
};
