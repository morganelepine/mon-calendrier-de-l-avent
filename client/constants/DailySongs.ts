import { currentDay, isDecember } from "@/constants/Dates";

export interface DailySong {
    // Day of December the song is unlocked.
    day: number;
    // YouTube video ID (the part after "watch?v=").
    videoId: string;
    title: string;
    artist?: string;
}

// Falls back to the latest song already unlocked,
// so a missing day (or the days after Christmas) still shows something.
export const getTodaySong = (): DailySong | null => {
    if (!isDecember) return null;

    return (
        DAILY_SONGS.filter((song) => song.day <= currentDay).sort(
            (a, b) => b.day - a.day,
        )[0] ?? null
    );
};

export const DAILY_SONGS: DailySong[] = [
    {
        day: 1,
        videoId: "cbZTfrhcamA",
        title: "It's the Most Wonderful Time of the Year",
        artist: "Andy Williams",
    },
    {
        day: 2,
        videoId: "SnA52s7qceM",
        title: "Santa Claus Is Coming To Town",
        artist: "Michael Bublé",
    },
    {
        day: 3,
        videoId: "v5ryZdpEHqM",
        title: "White Christmas",
        artist: "Bing Crosby",
    },
    {
        day: 4,
        videoId: "ElmsIGT85tI",
        title: "Candy Cane Lane",
        artist: "Sia",
    },
    {
        day: 5,
        videoId: "E8gmARGvPlI",
        title: "Last Christmas",
        artist: "Wham!",
    },
    {
        day: 6,
        videoId: "0G7HpFyEBVM",
        title: "1 Wish",
        artist: "Ava Max",
    },
    {
        day: 7,
        videoId: "WGKXlybareE",
        title: "Winter Wonderland",
        artist: "Frank Sinatra",
    },
    {
        day: 8,
        videoId: "ws3nQ4PhbzU",
        title: "Jingle Bells",
        artist: "Paul Brandt",
    },
    {
        day: 9,
        videoId: "aAkMkVFwAoo",
        title: "All I Want for Christmas Is You",
        artist: "Mariah Carey",
    },
    {
        day: 10,
        videoId: "I-2DgNOtA2o",
        title: "Brighten The Corner Where You Are",
        artist: "Ella Fitzgerald",
    },
    {
        day: 11,
        videoId: "sg8Gk1iXEIs",
        title: "Cozy Little Christmas",
        artist: "Katy Perry",
    },
    {
        day: 12,
        videoId: "kORRidv-p0Y",
        title: "Deck The Halls",
        artist: "Nat King Cole",
    },
    {
        day: 13,
        videoId: "N8NcQzMQN_U",
        title: "Feliz Navidad",
        artist: "José Feliciano",
    },
    {
        day: 14,
        videoId: "vtk3kyHlmfo",
        title: "Game Of Bells",
        artist: "L.E.J",
    },
    {
        day: 15,
        videoId: "BO_g0BgWiLI",
        title: "Here Comes Santa Claus",
        artist: "Elvis Presley",
    },
    {
        day: 16,
        videoId: "uQMkPKQ3s5c",
        title: "Here This Christmas",
        artist: "Gwen Stefani",
    },
    {
        day: 17,
        videoId: "0bhsXykXxfg",
        title: "It's Beginning to Look a Lot Like Christmas",
        artist: "Michael Bublé",
    },
    {
        day: 18,
        videoId: "Rnil5LyK_B0",
        title: "Let It Snow! Let It Snow! Let It Snow!",
        artist: "Dean Martin",
    },
    {
        day: 19,
        videoId: "lGsRTnaGFP0",
        title: "La marche des Rois mages",
    },
    {
        day: 20,
        videoId: "4cP26ndrmtg",
        title: "Christmas Canon",
        artist: "Trans-Siberian Orchestra",
    },
    {
        day: 21,
        videoId: "LUjn3RpkcKY",
        title: "Mistletoe",
        artist: "Justin Bieber",
    },
    {
        day: 22,
        videoId: "Okkyo2UvfX4",
        title: "Mon beau sapin",
        artist: "Tino Rossi",
    },
    {
        day: 23,
        videoId: "0rB78ut95cI",
        title: "O Holy Night",
        artist: "Etta James",
    },
    {
        day: 24,
        videoId: "TFsZy9t-qDc",
        title: "Rockin' Around The Christmas Tree",
        artist: "Brenda Lee",
    },
    {
        day: 25,
        videoId: "BDnrp5bTzUs",
        title: "We Wish You A Merry Christmas",
        artist: "The Everly Brothers",
    },
    {
        day: 26,
        videoId: "1UHmQANFtNs",
        title: "12 Days Of Christmas",
        artist: "Pentatonix",
    },
    {
        day: 27,
        videoId: "Rpg7-ab_F7s",
        title: "Baby It's Cold Outside",
        artist: "Brett Eldredge feat. Meghan Trainor",
    },
    {
        day: 28,
        videoId: "9aGh95USVtQ",
        title: "Dance Mr. Snowman Dance",
        artist: "The Crew Cuts",
    },
    {
        day: 29,
        videoId: "Hmw4Fu4XupE",
        title: "Frosty The Snowman",
        artist: "Ella Fitzgerald",
    },
    {
        day: 30,
        videoId: "J8k3Onc2v_8",
        title: "Vive le vent",
        artist: "Dalida",
    },
    {
        day: 31,
        videoId: "z0vjxfsUmSg",
        title: "Douce nuit",
        artist: "Tessa B.",
    },
];
