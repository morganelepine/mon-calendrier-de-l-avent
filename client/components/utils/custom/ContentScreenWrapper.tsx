import React from "react";
import { View } from "react-native";
import { FlatScreenWrapper } from "@/components/utils/custom/FlatScreenWrapper";

interface ContentScreenWrapperProps {
    typeTitle: string | undefined;
    backgroundImage: string;
    topImage?: string;
    children?: React.ReactNode;
    dayId: number;
}

export const ContentScreenWrapper: React.FC<ContentScreenWrapperProps> = ({
    typeTitle,
    backgroundImage,
    topImage,
    children,
    dayId,
}) => {
    const title = typeTitle || "Contenu du jour";

    return (
        <FlatScreenWrapper
            typeTitle={title}
            dayId={dayId}
            headerImage={topImage || backgroundImage}
        >
            <View style={{ padding: 20 }}>{children}</View>
        </FlatScreenWrapper>
    );
};
