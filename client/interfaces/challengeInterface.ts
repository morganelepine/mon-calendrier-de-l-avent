export interface Challenge {
    id: number;
    title: string;
    image: string; // Cloudinary public ID
    hint: string;
    reason: string;
}
