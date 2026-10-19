import { RefObject } from "react";
import { TurboModuleRegistry, View } from "react-native";
import { captureRef } from "react-native-view-shot";
import { SHARE_IMAGE_HEIGHT, SHARE_IMAGE_WIDTH } from "@/constants/shareImage";

// react-native-share's native module isn't in Expo Go.
export const isShareSupported = TurboModuleRegistry.get("RNShare") != null;

/**
 * Captures the share card as an image and opens the native share sheet,
 * with the message (and its link) as the caption.
 */
export const shareView = async (
    ref: RefObject<View | null>,
    message: string,
): Promise<void> => {
    if (!isShareSupported) return;

    let imageUri: string | undefined;
    try {
        imageUri = await captureRef(ref, {
            format: "jpg",
            quality: 0.9,
            width: SHARE_IMAGE_WIDTH,
            height: SHARE_IMAGE_HEIGHT,
            result: "tmpfile",
        });
    } catch {
        // Unable to capture: sharing the text only
    }

    try {
        const { default: Share } = await import("react-native-share");
        await Share.open({
            message,
            ...(imageUri ? { url: imageUri, type: "image/jpeg" } : {}),
            failOnCancel: false,
        });
    } catch {
        // Sharing can be dismissed or unavailable; no action is needed.
    }
};
