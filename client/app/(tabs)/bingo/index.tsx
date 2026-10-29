import { useState } from "react";
import {
    ScrollView,
    StyleSheet,
    View,
    useWindowDimensions,
} from "react-native";
import { BlueBackground } from "@/components/utils/BlueBackground";
import { CustomSafeAreaView } from "@/components/utils/custom/CustomSafeAreaView";
import { ActivityTile } from "@/components/activities/ActivityTile";
import { Game2048Card } from "@/components/activities/Game2048Card";
import { DailySongCard } from "@/components/activities/DailySongCard";
import { TvMoviesCard } from "@/components/activities/TvMoviesCard";
import { Game2048RulesModal } from "@/components/games2048/Game2048RulesModal";
import { Colors } from "@/constants/Colors";
import { isOctober } from "@/constants/Dates";
import { getTodaySong } from "@/constants/DailySongs";
import { useTodayTvMovies } from "@/hooks/useTodayTvMovies";

const BINGOS = isOctober
    ? [
          {
              title: "Le bingo d'automne",
              route: "halloween",
              color: Colors.autumnGreenDark,
              icon: "candle_fx7irz",
          },
      ]
    : [
          {
              title: "Bingo\nfilms\nde Noël",
              route: "movies",
              color: Colors.green,
              icon: "snowball-house-white_qxw7pt",
          },
          {
              title: "Bingo\nactivités\nde Noël",
              route: "activities",
              color: Colors.autumnGreen,
              icon: "hot-chocolate-white_j2rsw2",
          },
          {
              title: "Bingo\ntéléfilms\nde Noël",
              route: "telefilms",
              color: Colors.lightBlue,
              icon: "gigerbread-white_kmkvlp",
          },
      ];

const PADDING = 20;
const TILES_GAP = 10;

export default function GamesHubScreen() {
    const [game2048RulesVisible, setGame2048RulesVisible] = useState(false);

    const { movies: tvMovies } = useTodayTvMovies();
    const todaySong = getTodaySong();

    // Square tiles when three share the row.
    const { width } = useWindowDimensions();
    const tileSize = (width - 2 * PADDING - 2 * TILES_GAP) / 3;

    return (
        <BlueBackground>
            <CustomSafeAreaView>
                <ScrollView
                    style={styles.scrollView}
                    contentContainerStyle={styles.cardsContainer}
                >
                    <Game2048Card
                        onRulesPress={() => setGame2048RulesVisible(true)}
                    />

                    {tvMovies && tvMovies.length > 0 ? (
                        <TvMoviesCard movies={tvMovies} />
                    ) : null}

                    <View style={styles.tiles}>
                        {BINGOS.map((bingo) => (
                            <ActivityTile
                                key={bingo.route}
                                title={bingo.title}
                                color={bingo.color}
                                route={bingo.route}
                                icon={bingo.icon}
                                minHeight={tileSize}
                            />
                        ))}
                    </View>

                    {todaySong ? <DailySongCard song={todaySong} /> : null}
                </ScrollView>

                <Game2048RulesModal
                    modalVisible={game2048RulesVisible}
                    setModalVisible={setGame2048RulesVisible}
                />
            </CustomSafeAreaView>
        </BlueBackground>
    );
}

const styles = StyleSheet.create({
    scrollView: {
        width: "100%",
    },
    // flexGrow + center: stays vertically centered when the cards fit.
    cardsContainer: {
        flexGrow: 1,
        justifyContent: "center",
        gap: 16,
        padding: PADDING,
    },
    tiles: {
        flexDirection: "row",
        gap: TILES_GAP,
    },
});
