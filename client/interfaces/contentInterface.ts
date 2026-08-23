export interface Content {
    id: number;
    dayNumber: number;
    season?: string;
    type: string;
    subType?: string;
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
}

export interface WallpaperData {
    id: string | number;
    image: string;
    title?: string;
}
