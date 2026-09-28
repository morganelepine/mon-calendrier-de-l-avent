export interface Content {
    id: number;
    dayNumber: number;
    season?: string;
    type: string;
    subType?: string;
    typeTitle?: string;
    title: string;
    content1: string;
    content2?: string;
    content3?: string;
    content4?: string;
    media?: string;
    listOfContents?: ListOfContents[];
}

export interface ListOfContents {
    id: number;
    title: string;
    description: string;
    author?: string;
    image?: string;
    link?: string;
    url?: string;
    answers?: string;
    correctAnswer?: string;
}

export interface PersonalityQuizData {
    description?: string;
    questions: PersonalityQuizQuestion[];
    profiles: Record<string, PersonalityQuizProfile>;
}

export interface PersonalityQuizQuestion {
    question: string;
    answers: PersonalityQuizAnswer[];
}

export interface PersonalityQuizAnswer {
    text: string;
    profiles: string[]; // keys of PersonalityQuizData.profiles
}

export interface PersonalityQuizProfile {
    title: string;
    description: string;
    image?: string; // Cloudinary id
}

// First key of each card is its title, the other keys are its fields.
export interface CardsData {
    description?: string;
    labels?: Record<string, string>; // field key -> displayed label
    items: Record<string, string>[];
}

export interface WallpaperData {
    id: string | number;
    image: string;
    title?: string;
}
