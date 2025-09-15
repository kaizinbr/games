export interface User {
    id: string;
    name?: string | null;
    email: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
    posts?: Post[];
    Profile?: Profile | null;
    Account?: Account[];
    Session?: Session[];
}

export interface Profile {
    id: string;
    user: User;
    name?: string | null;
    bio?: string | null;
    username: string;
    lowername: string;
    avatarUrl?: string | null;
    pronouns?: string | null;
    site?: string | null;
    lists?: List[];
    posts?: GamePost[];
    gameStatus?: UserGameStatus[];
    public: boolean;
    verified: boolean;
    updatedAt: Date;
}

export interface Game {
    id: string;
    rawgId: number;
    title: string;
    coverUrl?: string | null;
    genre?: string | null;
    platform?: string | null;
    lists: ListGame[];
    posts: GamePost[];
    gameStatus: UserGameStatus[];
    createdAt: Date;
}

export interface List {
    id: string;
    name: string;
    description?: string | null;
    user: Profile;
    userId: string;
    games: ListGame[];
    createdAt: Date;
}

export interface ListGame {
    id: string;
    list: List;
    listId: string;
    game: Game;
    gameId: string;
}

export interface GamePost {
    id: string;
    content: string;
    imageUrl?: string | null;
    user: Profile;
    userId: string;
    game?: Game | null;
    gameId?: string | null;
    createdAt: Date;
}

export interface UserGameStatus {
    id: string;
    status: GameStatus;
    user: Profile;
    userId: string;
    game: Game;
    gameId: string;
}

export type GameStatus = "WANT_TO_PLAY" | "PLAYING" | "PLAYED" | "DROPPED";

export interface Account {
    id: string;
    userId: string;
    type: string;
    provider: string;
    providerAccountId: string;
    refresh_token?: string | null;
    access_token?: string | null;
    expires_at?: number | null;
    token_type?: string | null;
    scope?: string | null;
    id_token?: string | null;
    session_state?: string | null;
    user: User;
}

export interface Session {
    id: string;
    sessionToken: string;
    userId: string;
    expires: Date;
    user: User;
}

export interface VerificationToken {
    identifier: string;
    token: string;
    expires: Date;
}

export interface Post {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    title: string;
    content?: string | null;
    published: boolean;
    authorId?: string | null;
    author?: User | null;
}
