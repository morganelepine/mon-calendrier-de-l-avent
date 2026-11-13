import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { Colors, Fonts, SAFE_MARGIN } from "../theme";

// Shuffled like a real advent calendar.
const DOORS = [14, 3, 22, 9, 1, 17, 6, 20, 11, 24, 4, 15, 8, 19, 2, 12, 23, 7, 16, 10, 5, 21, 13, 18];
const DOOR_SIZE = 170;
const GAP = 20;
const OPEN_START = 50;

const DOOR_STYLES = [
    { background: Colors.red, color: Colors.snow },
    { background: Colors.green, color: Colors.snow },
    { background: Colors.goldLight, color: Colors.blue },
];

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

const Door: React.FC<{ day: number; index: number }> = ({ day, index }) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const appear = spring({ frame: frame - index * 1.5, fps, config: { damping: 12 } });
    const isFirst = day === 1;
    const open = isFirst ? spring({ frame: frame - OPEN_START, fps, config: { damping: 15 } }) : 0;
    const glow = isFirst ? interpolate(frame, [OPEN_START - 15, OPEN_START], [0, 1], clamp) : 0;

    return (
        <div style={{ width: DOOR_SIZE, height: DOOR_SIZE, position: "relative", perspective: 800, transform: `scale(${appear})` }}>
            <div
                style={{
                    position: "absolute",
                    inset: 0,
                    borderRadius: 24,
                    background: Colors.gold,
                    boxShadow: `0 0 ${60 * glow}px ${Colors.gold}`,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    fontSize: 90,
                    color: Colors.red,
                }}
            >
                ★
            </div>
            <div
                style={{
                    ...DOOR_STYLES[index % DOOR_STYLES.length],
                    position: "absolute",
                    inset: 0,
                    borderRadius: 24,
                    border: `4px solid ${isFirst ? Colors.gold : "transparent"}`,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    fontFamily: Fonts.title,
                    fontSize: 80,
                    transformOrigin: "left center",
                    transform: `rotateY(${-open * 110}deg)`,
                    backfaceVisibility: "hidden",
                }}
            >
                {day}
            </div>
        </div>
    );
};

export const DoorsGrid: React.FC = () => {
    const frame = useCurrentFrame();
    const caption = interpolate(frame, [10, 25], [0, 1], clamp);

    return (
        <AbsoluteFill style={{ alignItems: "center", paddingTop: SAFE_MARGIN.top }}>
            <div style={{ fontFamily: Fonts.bodyBold, fontSize: 64, color: Colors.snow, opacity: caption, marginBottom: 50, textAlign: "center" }}>
                24 surprises t'attendent
            </div>
            <div style={{ display: "grid", gridTemplateColumns: `repeat(4, ${DOOR_SIZE}px)`, gap: GAP }}>
                {DOORS.map((day, i) => (
                    <Door key={day} day={day} index={i} />
                ))}
            </div>
        </AbsoluteFill>
    );
};
