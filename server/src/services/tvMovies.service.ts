// Christmas TV movies schedule returning several upcoming days at once,
// with French-formatted dates ("dd/mm/yyyy") and Paris times ("hh:mm:ss").

const TV_MOVIES_API_URL =
    "https://christmas-movies-eight.vercel.app/api/movies";

interface RawTvMovie {
    title: string;
    description: string;
    image: string;
    startTime: { date: string; dayOfWeek: string; hour: string };
    endTime: { date: string; dayOfWeek: string; hour: string };
    channel: string;
}

export interface TvMovie {
    title: string;
    description: string;
    image: string;
    channel: string;
    startHour: string;
    endHour: string;
}

const CHANNEL_NAMES: Record<string, string> = {
    "TF1SeriesFilms.fr": "TF1 Séries Films",
};

const toChannelName = (channel: string): string =>
    CHANNEL_NAMES[channel] ?? channel.replace(/\.fr$/, "");

// "14:25:00" -> "14:25"
const toShortHour = (hour: string): string => hour.slice(0, 5);

// `date` is "dd/mm/yyyy", the format used by the upstream API.
export async function getTvMoviesByDate(date: string): Promise<TvMovie[]> {
    const apiKey = process.env.CHRISTMAS_MOVIES_API_KEY;
    if (!apiKey) {
        throw new Error("Missing CHRISTMAS_MOVIES_API_KEY");
    }

    const res = await fetch(TV_MOVIES_API_URL, {
        headers: { Authorization: `Basic ${apiKey}` },
        signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) {
        throw new Error(`TV movies API error ${res.status}`);
    }

    const json: { programs?: RawTvMovie[] } = await res.json();

    return (
        (json.programs ?? [])
            .filter((program) => program.startTime.date === date)
            .map((program) => ({
                title: program.title,
                description: program.description,
                image: program.image,
                channel: toChannelName(program.channel),
                startHour: toShortHour(program.startTime.hour),
                endHour: toShortHour(program.endTime.hour),
            }))
            // "hh:mm" strings sort chronologically.
            .sort((a, b) => a.startHour.localeCompare(b.startHour))
    );
}
