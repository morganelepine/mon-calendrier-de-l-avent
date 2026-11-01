import { File, Paths } from "expo-file-system";
import { TEST_TOOLS_ENABLED } from "@/constants/testTools";
import { formatIsoDate, parseIsoDate } from "@/services/tests/fakeDate.utils";

// A file rather than AsyncStorage: constants/Dates.ts needs the fake date
// synchronously, when the module is first evaluated.
const fakeDateFile = new File(Paths.document, "fake_date.txt");

export const getStoredFakeDate = (): Date | null => {
    if (!TEST_TOOLS_ENABLED) return null;
    try {
        return fakeDateFile.exists
            ? parseIsoDate(fakeDateFile.textSync())
            : null;
    } catch {
        return null;
    }
};

export const setStoredFakeDate = (date: Date | null): void => {
    if (date) {
        fakeDateFile.write(formatIsoDate(date));
    } else if (fakeDateFile.exists) {
        fakeDateFile.delete();
    }
};
