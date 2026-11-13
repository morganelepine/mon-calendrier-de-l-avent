import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { Colors, Fonts } from "../theme";

const TICK_FROM = 6;

export const CountdownHook: React.FC<{ daysLeft: number }> = ({ daysLeft }) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const intro = spring({ frame, fps, config: { damping: 14 } });
    // The number ticks down quickly before landing on daysLeft, then pops.
    const ticked = Math.max(daysLeft, daysLeft + TICK_FROM - Math.floor(frame / 3));
    const pop = spring({ frame: frame - TICK_FROM * 3, fps, config: { damping: 8, stiffness: 180 } });
    const subtitle = interpolate(frame, [30, 45], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

    return (
        <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", textAlign: "center" }}>
            <div style={{ fontFamily: Fonts.bodyBold, fontSize: 72, color: Colors.beige, opacity: intro, transform: `translateY(${(1 - intro) * 40}px)` }}>
                Plus que
            </div>
            <div
                style={{
                    fontFamily: Fonts.title,
                    fontSize: 520,
                    lineHeight: 1,
                    color: Colors.gold,
                    transform: `scale(${0.8 + pop * 0.2})`,
                    textShadow: `0 0 80px ${Colors.gold}66`,
                }}
            >
                {ticked}
            </div>
            <div style={{ fontFamily: Fonts.bodyBold, fontSize: 72, color: Colors.snow, opacity: subtitle, padding: "0 80px" }}>
                {daysLeft > 1 ? "jours" : "jour"} avant
                <br />
                le 1er décembre
            </div>
        </AbsoluteFill>
    );
};
