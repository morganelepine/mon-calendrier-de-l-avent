import { useCallback, useEffect, useState } from "react";
import {
    DayContents,
    getContentsByDay,
} from "@/services/contents/content.service";

export const useDayContents = (
    dayId: number,
): {
    contents: DayContents | undefined;
    hasError: boolean;
    reload: () => void;
} => {
    const [contents, setContents] = useState<DayContents>();
    const [hasError, setHasError] = useState(false);

    const reload = useCallback((): void => {
        setHasError(false);
        getContentsByDay(dayId)
            .then(setContents)
            .catch(() => setHasError(true));
    }, [dayId]);

    useEffect(() => {
        reload();
    }, [reload]);

    return { contents, hasError, reload };
};
