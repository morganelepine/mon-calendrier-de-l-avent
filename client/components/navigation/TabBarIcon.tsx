// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/

import Ionicons from "@expo/vector-icons/Ionicons";
import { isOctober } from "@/constants/Dates";
import { type IconProps } from "@expo/vector-icons/build/createIconSet";
import { type ComponentProps } from "react";
import MaterialDesignIcons from "@expo/vector-icons/MaterialCommunityIcons";

export function TabBarIcon({
    style,
    name,
    ...rest
}: IconProps<
    | ComponentProps<typeof Ionicons>["name"]
    | ComponentProps<typeof MaterialDesignIcons>["name"]
>) {
    return isOctober ? (
        <MaterialDesignIcons
            size={24}
            name={name as ComponentProps<typeof MaterialDesignIcons>["name"]}
            style={[{ marginBottom: -3 }, style]}
            {...rest}
        />
    ) : (
        <Ionicons
            size={24}
            name={name as ComponentProps<typeof Ionicons>["name"]}
            style={[{ marginBottom: -3 }, style]}
            {...rest}
        />
    );
}
