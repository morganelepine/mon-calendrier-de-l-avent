export interface Challenge {
    id: number;
    title: string;
    image: string; // Cloudinary public ID
    hint: string;
    author?: string;
    reason: string;
    nativeOnly?: boolean; // impossible on the PWA, so hidden there
}
