export const activityCardBase = {
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.4)",
} as const;

export const activityPressed = {
    opacity: 0.85,
} as const;

// Source images are 300x169: kept small so they aren't upscaled.
export const tvMovieImage = {
    width: 120,
    aspectRatio: 16 / 9,
    borderRadius: 8,
} as const;
