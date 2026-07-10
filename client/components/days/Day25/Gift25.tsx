import React, { useEffect } from "react";
import { router } from "expo-router";
import { Pressable, StyleSheet, Image, ToastAndroid } from "react-native";
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withRepeat,
    withTiming,
} from "react-native-reanimated";
import { Gift } from "@/interfaces/giftInterface";
import { getCloudinaryImageUrl } from "@/services/cloudinary.service";

interface GiftProps {
    gift: Gift;
}

export const Gift25: React.FC<GiftProps> = ({ gift }) => {
    const rotation = useSharedValue(0);

    useEffect(() => {
        rotation.value = withRepeat(
            withTiming(gift.oscillation, { duration: gift.timing }), // Oscillation à gift.oscillation degrés
            -1, // Répéter infiniment
            true // Revenir au point de départ après chaque cycle
        );
    }, []);

    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [
                { rotate: `${rotation.value}deg` }, // Appliquer la rotation
            ],
        };
    });

    const openGift = () => {
        if (gift.win) {
            router.navigate({
                pathname: "/calendar/day25",
            });
        } else {
            ToastAndroid.show("Ouvrez un autre cadeau !", ToastAndroid.SHORT);
        }
    };

    return (
        <>
            <Pressable style={styles.cell} onPress={openGift}>
                <Animated.View style={[animatedStyle]}>
                    <Image
                        source={{ uri: getCloudinaryImageUrl(gift.image) }}
                        style={styles.itemBackground}
                        resizeMode="contain"
                    />
                </Animated.View>
            </Pressable>
        </>
    );
};

const styles = StyleSheet.create({
    cell: {
        height: "25%",
        aspectRatio: 1,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 8,
        padding: 4,
    },
    itemBackground: {
        width: "100%",
        height: undefined,
        aspectRatio: 1,
        borderRadius: 5,
    },
});
