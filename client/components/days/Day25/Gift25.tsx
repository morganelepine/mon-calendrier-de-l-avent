import React, { useState, useEffect } from "react";
import { router } from "expo-router";
import { Pressable, StyleSheet, Image } from "react-native";
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withRepeat,
    withTiming,
} from "react-native-reanimated";
import { WrongGiftModal } from "@/components/days/Day25/WrongGiftModal";
import { Gift } from "@/interfaces/giftInterface";
import { getCloudinaryImageUrl } from "@/services/cloudinary";

interface GiftProps {
    gift: Gift;
}

export const Gift25: React.FC<GiftProps> = ({ gift }) => {
    const [modalVisible, setModalVisible] = useState(false);

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
            router.push({
                pathname: "/calendar/day25",
            });
        } else {
            setModalVisible(true);
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

            <WrongGiftModal
                modalVisible={modalVisible}
                setModalVisible={setModalVisible}
            />
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
