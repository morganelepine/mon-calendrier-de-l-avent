import { Composition } from "remotion";
import { Countdown, COUNTDOWN_DURATION, CountdownProps } from "./compositions/Countdown";
import { VIDEO } from "./theme";

const totalFrames = (durations: Record<string, number>): number =>
    Object.values(durations).reduce((sum, d) => sum + d, 0);

export const RemotionRoot: React.FC = () => (
    <Composition
        id="Countdown"
        component={Countdown}
        durationInFrames={totalFrames(COUNTDOWN_DURATION)}
        {...VIDEO}
        defaultProps={{ daysLeft: 22, cta: "Gratuit sur Android" } satisfies CountdownProps}
    />
);
