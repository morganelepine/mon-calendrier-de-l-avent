import { RefObject } from "react";
import { View } from "react-native";
import Share from "react-native-share";
import { captureRef } from "react-native-view-shot";

// 4:5 portrait, the format Instagram and most messaging apps display in full.
export const SHARE_IMAGE_WIDTH = 1080;
export const SHARE_IMAGE_HEIGHT = 1350;

/**
 * Captures the share card as an image and opens the native share sheet,
 * with the message (and its link) as the caption.
 */
export const shareView = async (
    ref: RefObject<View | null>,
    message: string,
): Promise<void> => {
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
        await Share.open({
            message,
            ...(imageUri ? { url: imageUri, type: "image/jpeg" } : {}),
            failOnCancel: false,
        });
    } catch {
        // Sharing can be dismissed or unavailable; no action is needed.
    }
};
