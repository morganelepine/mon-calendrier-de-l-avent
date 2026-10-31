import { ReactNode } from "react";
import { Separator } from "@/components/utils/Separator";
import { isChristmasSeason } from "@/constants/Dates";

type Props = {
    autumn: ReactNode;
    christmas: ReactNode;
};

// The upcoming season comes first: autumn from January to October, Christmas in November and December.
export const SeasonalSections = ({ autumn, christmas }: Props) => {
    const [first, second] = isChristmasSeason
        ? [christmas, autumn]
        : [autumn, christmas];

    return (
        <>
            {first}
            <Separator />
            {second}
        </>
    );
};
