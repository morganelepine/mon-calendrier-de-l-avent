import { View } from "react-native";
import { router, usePathname } from "expo-router";
import { PillTabBar } from "@/components/navigation/PillTabBar";
import { Theme } from "@/constants/Colors";

const TABS = [
    { key: "/bingo/game2048-leaderboard/general", label: "Top" },
    { key: "/bingo/game2048-leaderboard/group", label: "Mon groupe" },
    { key: "/bingo/game2048-leaderboard/mine", label: "Mon classement" },
] as const;

export const Game2048LeaderboardTabBar = () => {
    const pathname = usePathname();

    return (
        <View style={{ backgroundColor: Theme.goldToBlue, paddingTop: 8 }}>
            <PillTabBar
                items={TABS}
                activeKey={pathname}
                onSelect={(key) => router.navigate(key as never)}
                withBackgroundStrip
            />
        </View>
    );
};
