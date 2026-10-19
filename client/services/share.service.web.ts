// Web version of share.service.ts: sharing is disabled on the PWA, and this
// file keeps react-native-share (native only) out of the web bundle.
export const isShareSupported = false;

export const shareView = async (): Promise<void> => {};
