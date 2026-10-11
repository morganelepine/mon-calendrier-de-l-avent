import React, {
    createContext,
    RefObject,
    useCallback,
    useContext,
    useMemo,
    useRef,
    useState,
} from "react";
import { View } from "react-native";
import { DailySong } from "@/constants/DailySongs";

export interface SlotLayout {
    x: number;
    y: number;
    width: number;
    height: number;
}

interface DailySongContextType {
    song: DailySong | null;
    playing: boolean;
    // True while the daily song screen is focused: the player then fills the
    // slot reserved by that screen instead of floating as a mini-player.
    isExpanded: boolean;
    slotLayout: SlotLayout | null;
    // Full-screen view the player is positioned in: the slot is measured
    // relative to it, not to the window (which on Android excludes the
    // status bar and shifted the player up).
    hostRef: RefObject<View | null>;
    start: (song: DailySong) => void;
    setPlaying: (playing: boolean) => void;
    close: () => void;
    setExpanded: (expanded: boolean) => void;
    setSlotLayout: (layout: SlotLayout) => void;
}

const DailySongContext = createContext<DailySongContextType | undefined>(
    undefined,
);

// The YouTube player lives at the root (see DailySongPlayer) so the music
// keeps playing while the user navigates elsewhere in the app.
export const DailySongProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const [song, setSong] = useState<DailySong | null>(null);
    const [playing, setPlaying] = useState(false);
    const [isExpanded, setExpanded] = useState(false);
    const [slotLayout, setSlotLayout] = useState<SlotLayout | null>(null);
    const hostRef = useRef<View>(null);

    // Keeps the song already loaded (and its playback) if there is one.
    const start = useCallback((next: DailySong) => {
        setSong((current) => current ?? next);
    }, []);

    const close = useCallback(() => {
        setPlaying(false);
        setSong(null);
    }, []);

    const value = useMemo(
        () => ({
            song,
            playing,
            isExpanded,
            slotLayout,
            hostRef,
            start,
            setPlaying,
            close,
            setExpanded,
            setSlotLayout,
        }),
        [song, playing, isExpanded, slotLayout, start, close],
    );

    return (
        <DailySongContext.Provider value={value}>
            {children}
        </DailySongContext.Provider>
    );
};

export const useDailySong = () => {
    const context = useContext(DailySongContext);
    if (!context) {
        throw new Error("useDailySong must be used inside DailySongProvider");
    }
    return context;
};
