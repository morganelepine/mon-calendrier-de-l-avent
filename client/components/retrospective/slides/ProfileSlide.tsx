import { StyleSheet } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { Comparison } from "@/components/retrospective/slides/Comparison";
import {
    TIME_PROFILES,
    formatPercent,
} from "@/components/retrospective/retrospectiveTexts";
import { Colors } from "@/constants/Colors";
import { Retrospective } from "@/interfaces/retrospectiveInterface";

type ProfileSlideProps = Pick<Retrospective, "timeProfile"> & {
    icon: string; // Cloudinary id of the comparison icon
};

export const ProfileSlide: React.FC<ProfileSlideProps> = ({
    timeProfile,
    icon,
}) => {
    const profile = TIME_PROFILES[timeProfile.value];

    return (
        <>
            <ThemedText style={styles.title}>{profile.title}</ThemedText>
            <ThemedText style={styles.description}>
                {profile.description}
            </ThemedText>
            <Comparison
                text={`Comme ${formatPercent(timeProfile.samePercent)} des\u00a0joueur·euse·s`}
                image={icon}
            />
        </>
    );
};

const styles = StyleSheet.create({
    title: {
        fontFamily: "FreightNeoBold",
        fontSize: 34,
        lineHeight: 40,
        color: Colors.lightRed,
        textAlign: "center",
        marginBottom: 8,
    },
    description: {
        textAlign: "center",
        paddingHorizontal: 8,
    },
});
