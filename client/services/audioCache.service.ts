import { Directory, File, Paths } from "expo-file-system";

// Tracks come from Cloudinary, whose bandwidth is billed: each one is
// downloaded once, then played from disk.
const audioDirectory = new Directory(Paths.cache, "audio");

// Several play requests for the same track share a single download.
const pendingDownloads = new Map<string, Promise<string>>();

const fileNameFromUrl = (url: string): string =>
    url.replace(/^https?:\/\//, "").replace(/[^a-zA-Z0-9.-]/g, "_");

const download = async (url: string, file: File): Promise<string> => {
    // Downloaded under a temporary name so an interrupted download never
    // leaves a truncated file that would be played as if it were complete.
    const partial = new File(audioDirectory, `${file.name}.part`);
    try {
        if (!audioDirectory.exists) {
            audioDirectory.create({ intermediates: true });
        }
        if (partial.exists) partial.delete();
        await File.downloadFileAsync(url, partial);
        partial.move(file);
        return file.uri;
    } catch (error) {
        console.warn("Audio caching failed, streaming instead", error);
        return url;
    }
};

/**
 * Returns the local URI of the audio file, downloading it on the first call.
 * If that fails, returns the remote URL for streaming the file.
 */
export const getCachedAudioUri = async (url: string): Promise<string> => {
    const file = new File(audioDirectory, fileNameFromUrl(url));
    if (file.exists) return file.uri;

    let pending = pendingDownloads.get(url);
    if (!pending) {
        pending = download(url, file).finally(() =>
            pendingDownloads.delete(url),
        );
        pendingDownloads.set(url, pending);
    }
    return pending;
};
