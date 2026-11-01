import { Dimensions, Image } from "react-native";

const CLOUDINARY_ROOT_URL = "https://res.cloudinary.com/deauthz29";
export const CLOUDINARY_BASE_URL = `${CLOUDINARY_ROOT_URL}/image/upload/`;
const CLOUDINARY_AUDIO_BASE_URL = `${CLOUDINARY_ROOT_URL}/video/upload/`;

// Applied to every image: f_auto serves WebP/AVIF to clients that support it,
// q_auto lets Cloudinary pick the smallest quality that still looks good.
const DEFAULT_TRANSFORMATIONS = "f_auto,q_auto";

/**
 * Returns the full Cloudinary URL for an image.
 * @param publicId the name/ID of the image on Cloudinary
 * @param options additional transformation options (e.g., w_200,h_200,c_fill)
 */
export const getCloudinaryImageUrl = (
    publicId: string,
    options?: string,
): string => {
    const transformations = options
        ? `${DEFAULT_TRANSFORMATIONS},${options}`
        : DEFAULT_TRANSFORMATIONS;
    return `${CLOUDINARY_BASE_URL}${transformations}/${publicId}`;
};

// 96 kbps is plenty for background music and cuts the files 2-3x (bandwidth
// is most of the Cloudinary bill). The .mp3 extension makes Cloudinary drop
// the video track of .mp4 sources.
export const getCloudinaryAudioUrl = (publicId: string): string =>
    `${CLOUDINARY_AUDIO_BASE_URL}br_96k/${publicId}.mp3`;

export const formatImage = (
    day: number,
    image: string | undefined,
    maxHeight: number,
    setImageDimensions: React.Dispatch<
        React.SetStateAction<{
            [key: string]: { width: number; height: number };
        }>
    >,
): void => {
    const screenWidth = Dimensions.get("window").width;

    const imageUrl = getCloudinaryImageUrl(image ?? "");

    Image.getSize(imageUrl, (width, height) => {
        const ratio = Math.min(screenWidth / width, maxHeight / height);
        const adjustedWidth = width * ratio;
        const adjustedHeight = height * ratio;

        setImageDimensions((prev) => ({
            ...prev,
            [day]: {
                width: adjustedWidth,
                height: adjustedHeight,
            },
        }));
    });
};
