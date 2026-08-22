import { View } from "react-native";
import { Theme } from "@/constants/Colors";

interface Props {
    image?: string;
    children?: React.ReactNode;
}

export const BlueBackground: React.FC<Props> = ({ children }) => {
    return (
        <View
            style={{
                flex: 1,
                backgroundColor: Theme.surface,
            }}
        >
            {children}
        </View>
    );
};
