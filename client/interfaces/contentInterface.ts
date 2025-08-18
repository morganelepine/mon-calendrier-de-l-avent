export interface Content {
    id: number;
    dayNumber: number;
    type: string;
    title: string;
    content1: string;
    content2: string;
    content3: string;
    content4: string;
    content5: string;
    image?: string;
    listOfContents?: ListOfContents[];
}

export interface ListOfContents {
    id: number;
    title: string;
    description?: string;
    link?: string;
    author?: string;
    url?: string;
    image?: string;
}
