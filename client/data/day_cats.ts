import { isOctober } from "@/constants/Dates";
import { Day } from "@/interfaces/dayInterface";
import { getCloudinaryImageUrl } from "@/services/cloudinary.service";

const CHRISTMAS_CATS: string[] = [
    "1_rsfej4",
    "2_fjdy6m",
    "3_lzeg4q",
    "4_gb2mee",
    "5_empdpl",
    "6_lqeh0q",
    "7_oqo9bk",
    "8_oluh84",
    "9_wvcuhu",
    "10_mmw9fk",
    "11_g0nvn6",
    "12_tci0zb",
    "13_lldspx",
    "14_y6i86y",
    "15_sypceq",
    "16_yof8ue",
    "17_ovi711",
    "18_tsik0x",
    "19_q2e5f0",
    "20_thrvj2",
    "21_nhaguw",
    "22_yxvhfb",
    "23_wxyv5s",
    "24_mvynoa",
];

const HALLOWEEN_CATS: string[] = [];

const LAST_CHRISTMAS_CAT_DAY = 24;

// Not stored on Day: existing users have their calendar saved in AsyncStorage,
// so new fields in the data files would never reach them.
export const getDayCatImageUrl = (
    day: Pick<Day, "dayNumber" | "background">,
): string | null => {
    // Day 25 already has its own gift reveal.
    if (!isOctober && day.dayNumber > LAST_CHRISTMAS_CAT_DAY) return null;

    const cats = isOctober ? HALLOWEEN_CATS : CHRISTMAS_CATS;
    const cat = cats[(day.dayNumber - 1) % cats.length] ?? day.background;

    return getCloudinaryImageUrl(cat);
};
