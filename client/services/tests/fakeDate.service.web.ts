// expo-file-system isn't available on web, and test tools are native-only.
export const getStoredFakeDate = (): Date | null => null;
export const setStoredFakeDate = (): void => {};
