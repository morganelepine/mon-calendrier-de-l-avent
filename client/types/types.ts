export type MusicPreference = "yes" | "no" | null;

export type User = {
    id: number;
    uuid: string;
    username: string;
    score: number;
    pushToken?: string | null;
};

export type GroupMember = {
    id: number;
    groupId: number;
    userId: number;
    user: User;
    group: Group;
    addedAt: string;
};

export type Group = {
    id: number;
    name: string;
    ownerId: number;
    user: User;
    members: GroupMember[];
};
