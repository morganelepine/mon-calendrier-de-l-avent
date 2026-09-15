import { CountdownVariant } from "@/enums/enums";
import { useCountdown } from "@/hooks/useCountdown";
import { NightsCountdown } from "@/components/calendar/Countdown/NightsCountdown";
import { ColumnsCountdown } from "@/components/calendar/Countdown/ColumnsCountdown";

interface CountdownDisplayProps {
    variant: CountdownVariant;
    nights: number;
    targetDate: Date;
    showSeconds: boolean;
}

export const CountdownDisplay = ({
    variant,
    nights,
    targetDate,
    showSeconds,
}: CountdownDisplayProps) => {
    const remaining = useCountdown(
        targetDate,
        variant !== CountdownVariant.Nights,
    );

    switch (variant) {
        case CountdownVariant.Columns:
            return (
                <ColumnsCountdown {...remaining} showSeconds={showSeconds} />
            );
        case CountdownVariant.Nights:
        default:
            return <NightsCountdown nights={nights} />;
    }
};
