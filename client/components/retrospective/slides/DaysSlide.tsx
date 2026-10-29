import { StyleSheet, View } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { DaysGrid } from "@/components/retrospective/DaysGrid";
import { Comparison } from "@/components/retrospective/slides/Comparison";
import { slideStyles } from "@/components/retrospective/slides/slideStyles";
import {
    formatPercent,
    getHigherThanText,
} from "@/components/retrospective/retrospectiveTexts";
import { Retrospective } from "@/interfaces/retrospectiveInterface";

type DaysSlideProps = Pick<Retrospective, "daysOpened" | "openedDays"> & {
    icon: string; // Cloudinary id of the comparison icon
};

export const DaysSlide: React.FC<DaysSlideProps> = ({
    daysOpened,
    openedDays,
    icon,
}) => {
    const openedAll = daysOpened.value === 24;

    return (
        <>
            <ThemedText style={slideStyles.bigNumber}>
                {daysOpened.value}
            </ThemedText>
            <ThemedText style={slideStyles.title}>
                cases ouvertes{"\n"}le jour même
            </ThemedText>
            <View style={styles.grid}>
                <DaysGrid
                    openedDays={openedDays}
                    cellSize={30}
                    surface="light"
                />
            </View>
            <Comparison
                text={
                    openedAll
                        ? `Comme ${formatPercent(daysOpened.samePercent)} des\u00a0joueur·euse·s,\nvous n'en avez manqué aucune\u00a0!`
                        : getHigherThanText(daysOpened)
                }
                image={icon}
            />
        </>
    );
};

const styles = StyleSheet.create({
    grid: {
        marginTop: 24,
    },
});
