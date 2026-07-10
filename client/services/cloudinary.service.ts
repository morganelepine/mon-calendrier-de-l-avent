export const CLOUDINARY_BASE_URL =
    "https://res.cloudinary.com/deauthz29/image/upload/";

/**
 * Retourne l'URL complète d'une image Cloudinary.
 * @param publicId le nom/ID de l'image sur Cloudinary
 * @param options options de transformation (ex: w_200,h_200,c_fill)
 */
export const getCloudinaryImageUrl = (publicId: string, options?: string) => {
    return options
        ? `${CLOUDINARY_BASE_URL}${options}/${publicId}`
        : `${CLOUDINARY_BASE_URL}${publicId}`;
};
