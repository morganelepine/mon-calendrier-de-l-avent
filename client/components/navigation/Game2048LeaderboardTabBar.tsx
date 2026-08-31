import { router, usePathname } from "expo-router";
import { PillTabBar } from "@/components/navigation/PillTabBar";

const TABS = [
    { key: "/bingo/game2048-leaderboard/general", label: "Top" },
    { key: "/bingo/game2048-leaderboard/group", label: "Mon groupe" },
    { key: "/bingo/game2048-leaderboard/mine", label: "Mon classement" },
] as const;

export const Game2048LeaderboardTabBar = () => {
    const pathname = usePathname();

    return (
        <PillTabBar
            items={TABS}
            activeKey={pathname}
            onSelect={(key) => router.navigate(key as never)}
            withBackgroundStrip
        />
    );
};
