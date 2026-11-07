import { useEffect, useState } from "react";
import { useReducedMotion } from "react-native-reanimated";
import { ThemedText } from "@/components/ThemedText";
import { slideStyles } from "@/components/retrospective/slides/slideStyles";

const DURATION = 3000;

const easeOutCubic = (progress: number): number => 1 - (1 - progress) ** 3;

interface CountUpNumberProps {
    value: number;
    format?: (value: number) => string;
}

// The counter's state stays in here so only this text re-renders on each frame.
export const CountUpNumber: React.FC<CountUpNumberProps> = ({
    value,
    format = String,
}) => {
    const reduceMotion = useReducedMotion();
    const [displayed, setDisplayed] = useState(0);

    useEffect(() => {
        if (reduceMotion) return undefined;

        let frame: number;
        let start: number | null = null;
        const tick = (time: number): void => {
            start ??= time;
            const progress = Math.min((time - start) / DURATION, 1);
            setDisplayed(Math.round(value * easeOutCubic(progress)));
            if (progress < 1) frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);

        return (): void => cancelAnimationFrame(frame);
    }, [value, reduceMotion]);

    return (
        <ThemedText
            style={slideStyles.bigNumber}
            accessibilityLabel={format(value)}
        >
            {format(reduceMotion ? value : displayed)}
        </ThemedText>
    );
};
