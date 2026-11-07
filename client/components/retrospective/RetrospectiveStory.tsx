import { useEffect, useState } from "react";
import { Image } from "expo-image";
import { CustomButton } from "@/components/utils/buttons/Button";
import { ShareCardPreview } from "@/components/utils/share/ShareCard";
import { ShareBackgroundPicker } from "@/components/utils/share/ShareBackgroundPicker";
import { RecapCard } from "@/components/retrospective/RecapCard";
import {
    StoryBackground,
    StorySlide,
    StoryViewer,
    getStoryBackgroundUrl,
} from "@/components/retrospective/StoryViewer";
import { IntroSlide } from "@/components/retrospective/slides/IntroSlide";
import { DaysSlide } from "@/components/retrospective/slides/DaysSlide";
import { StreakSlide } from "@/components/retrospective/slides/StreakSlide";
import { ProfileSlide } from "@/components/retrospective/slides/ProfileSlide";
import { GamesSlide } from "@/components/retrospective/slides/GamesSlide";
import { ChallengesSlide } from "@/components/retrospective/slides/ChallengesSlide";
import { PointsSlide } from "@/components/retrospective/slides/PointsSlide";
import { Theme } from "@/constants/Colors";
import { COUNTDOWN_SHARE_BACKGROUNDS } from "@/constants/shareBackgrounds";
import { Retrospective } from "@/interfaces/retrospectiveInterface";
import { isShareSupported } from "@/services/share.service";
import { getCloudinaryImageUrl } from "@/services/cloudinary.service";

// Header + footer buttons around the recap card preview.
const RECAP_RESERVED_HEIGHT = 240;

const BACKGROUNDS = {
    intro: { image: "5_px9eyq", centerY: 0.55 },
    days: { image: "4_fjyvf5", centerY: 0.49 },
    streak: { image: "1_vbmz7f", centerY: 0.54 },
    profile: { image: "2_dd66wr", centerY: 0.53 },
    points: { image: "3_gnqoay", centerY: 0.51 },
    games: { image: "7_ni2fex", centerY: 0.5 },
    challenges: { image: "6_r7w69n", centerY: 0.52 },
} satisfies Record<string, StoryBackground>;

const ICONS = {
    days: "snowball_drp5b8",
    streak: "sock_mwzh9g",
    profile: "gingerbread_vv4eqe",
    points: "bell_lxv9tw",
    games: "snowman_bjriwh",
    challenges: "hot_chocolate_zd4xcc",
};

interface RetrospectiveStoryProps {
    retrospective: Retrospective;
    visible: boolean;
    onClose: () => void;
}

export const RetrospectiveStory: React.FC<RetrospectiveStoryProps> = ({
    retrospective,
    visible,
    onClose,
}) => {
    const [pickerVisible, setPickerVisible] = useState(false);

    // Avoids blank frames and icons while each slide's images download.
    // Same URLs as StoryViewer and Comparison, so the cache serves them.
    useEffect(() => {
        if (visible) {
            void Image.prefetch([
                ...Object.values(BACKGROUNDS).map(({ image }) =>
                    getStoryBackgroundUrl(image),
                ),
                ...Object.values(ICONS).map((icon) =>
                    getCloudinaryImageUrl(icon),
                ),
            ]);
        }
    }, [visible]);

    const { year, correctAnswers, challengesCompleted, longestStreak } =
        retrospective;
    const shareMessage = `Voici la rétrospective de mon Avent 🎄 Quelle est la tienne ?`;

    const slides: StorySlide[] = [
        {
            key: "intro",
            background: BACKGROUNDS.intro,
            content: <IntroSlide year={year} />,
        },
        {
            key: "days",
            background: BACKGROUNDS.days,
            content: <DaysSlide {...retrospective} icon={ICONS.days} />,
        },
        ...(longestStreak.value > 1
            ? [
                  {
                      key: "streak",
                      background: BACKGROUNDS.streak,
                      content: (
                          <StreakSlide {...retrospective} icon={ICONS.streak} />
                      ),
                  },
              ]
            : []),
        {
            key: "profile",
            background: BACKGROUNDS.profile,
            content: <ProfileSlide {...retrospective} icon={ICONS.profile} />,
        },
        {
            key: "points",
            background: BACKGROUNDS.points,
            content: <PointsSlide {...retrospective} icon={ICONS.points} />,
        },
        ...(correctAnswers.value > 0
            ? [
                  {
                      key: "games",
                      background: BACKGROUNDS.games,
                      content: (
                          <GamesSlide {...retrospective} icon={ICONS.games} />
                      ),
                  },
              ]
            : []),
        ...(challengesCompleted.value > 0
            ? [
                  {
                      key: "challenges",
                      background: BACKGROUNDS.challenges,
                      content: (
                          <ChallengesSlide
                              {...retrospective}
                              icon={ICONS.challenges}
                          />
                      ),
                  },
              ]
            : []),
        {
            key: "recap",
            content: (
                <ShareCardPreview
                    backgroundImage={COUNTDOWN_SHARE_BACKGROUNDS[0]}
                    reservedHeight={RECAP_RESERVED_HEIGHT}
                >
                    <RecapCard retrospective={retrospective} />
                </ShareCardPreview>
            ),
            footer: isShareSupported && (
                <CustomButton
                    color={Theme.orangeToRed}
                    onPress={() => setPickerVisible(true)}
                >
                    Partager ma carte
                </CustomButton>
            ),
        },
    ];

    return (
        <StoryViewer visible={visible} onClose={onClose} slides={slides}>
            {isShareSupported && (
                <ShareBackgroundPicker
                    visible={pickerVisible}
                    onClose={() => setPickerVisible(false)}
                    backgrounds={COUNTDOWN_SHARE_BACKGROUNDS}
                    message={shareMessage}
                >
                    <RecapCard retrospective={retrospective} />
                </ShareBackgroundPicker>
            )}
        </StoryViewer>
    );
};
