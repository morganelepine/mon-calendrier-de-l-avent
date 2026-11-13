import { Series } from "remotion";
import { Background } from "../components/Background";
import { CountdownHook } from "../scenes/CountdownHook";
import { DoorsGrid } from "../scenes/DoorsGrid";
import { EndCard } from "../scenes/EndCard";

export type CountdownProps = {
    daysLeft: number;
    cta: string;
};

export const COUNTDOWN_DURATION = { hook: 75, grid: 105, end: 90 };

export const Countdown: React.FC<CountdownProps> = ({ daysLeft, cta }) => (
    <Background>
        <Series>
            <Series.Sequence durationInFrames={COUNTDOWN_DURATION.hook}>
                <CountdownHook daysLeft={daysLeft} />
            </Series.Sequence>
            <Series.Sequence durationInFrames={COUNTDOWN_DURATION.grid}>
                <DoorsGrid />
            </Series.Sequence>
            <Series.Sequence durationInFrames={COUNTDOWN_DURATION.end}>
                <EndCard cta={cta} />
            </Series.Sequence>
        </Series>
    </Background>
);
