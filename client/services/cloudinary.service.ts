export const CLOUDINARY_BASE_URL =
    "https://res.cloudinary.com/deauthz29/image/upload/";

// Applied to every image: f_auto serves WebP/AVIF to clients that support it,
// q_auto lets Cloudinary pick the smallest quality that still looks good.
const DEFAULT_TRANSFORMATIONS = "f_auto,q_auto";

/**
 * Retourne l'URL complète d'une image Cloudinary.
 * @param publicId le nom/ID de l'image sur Cloudinary
 * @param options options de transformation additionnelles (ex: w_200,h_200,c_fill)
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
