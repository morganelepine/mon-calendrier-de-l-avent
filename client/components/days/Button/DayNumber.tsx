import { StyleSheet, Text, Image } from "react-native";
import { Theme } from "@/constants/Colors";
import { isOctober } from "@/constants/Dates";
import { Day } from "@/interfaces/dayInterface";
import { getCloudinaryImageUrl } from "@/services/cloudinary.service";

interface DayNumberProps {
    day: Day;
    dayIsOpen: boolean | null;
}

export const DayNumber: React.FC<DayNumberProps> = ({ day, dayIsOpen }) => {
    return (
        <>
            <Image
                source={{ uri: getCloudinaryImageUrl(day.image) }}
                style={[
                    styles.itemBackground,
                    {
                        aspectRatio: day.aspectRatio,
                    },
                ]}
                resizeMode="contain"
            />

            <Text
                style={[
                    styles.itemText,
                    {
                        color: dayIsOpen ? Theme.green : day.textColor,
                    },
                ]}
            >
                {day.dayNumber}
            </Text>
        </>
    );
};

const styles = StyleSheet.create({
    itemBackground: {
        width: "100%",
        height: undefined,
    },
    itemText: {
        fontSize: isOctober ? 16 : 30,
        fontFamily: "Pally",
        paddingVertical: 2,
        paddingHorizontal: 5,
        position: "absolute",
        top: 0,
        zIndex: 1,
    },
});
