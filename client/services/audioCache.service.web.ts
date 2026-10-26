// expo-file-system isn't available on web: the browser HTTP cache takes over.
export const getCachedAudioUri = async (url: string): Promise<string> => url;
