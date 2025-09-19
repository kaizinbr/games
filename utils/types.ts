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
    publisher?: string | null;
    releaseDate?: string | null;
    playtime?: number | null;
    description?: string | null;
    lists: ListGame[];
    posts: GamePost[];
    gameStatus: UserGameStatus[];
    updatedAt: Date;
    createdAt: Date;
}

export interface RawgGame {
    id: number;
    slug: string;
    name: string;
    name_original: string;
    description: string;
    metacritic: number | null;
    metacritic_platforms: unknown[];
    released: string;
    tba: boolean;
    updated: string;
    background_image: string;
    background_image_additional: string;
    website: string;
    rating: number;
    rating_top: number;
    ratings: {
        id: number;
        title: string;
        count: number;
        percent: number;
    }[];
    reactions: Record<string, number>;
    added: number;
    added_by_status: {
        yet: number;
        owned: number;
        beaten: number;
        toplay: number;
        dropped: number;
        playing: number;
    };
    playtime: number;
    screenshots_count: number;
    movies_count: number;
    creators_count: number;
    achievements_count: number;
    parent_achievements_count: number;
    reddit_url: string;
    reddit_name: string;
    reddit_description: string;
    reddit_logo: string;
    reddit_count: number;
    twitch_count: number;
    youtube_count: number;
    reviews_text_count: number;
    ratings_count: number;
    suggestions_count: number;
    alternative_names: string[];
    metacritic_url: string;
    parents_count: number;
    additions_count: number;
    game_series_count: number;
    user_game: unknown;
    reviews_count: number;
    saturated_color: string;
    dominant_color: string;
    parent_platforms: {
        platform: {
            id: number;
            name: string;
            slug: string;
        };
    }[];
    platforms: {
        platform: {
            id: number;
            name: string;
            slug: string;
            image: string | null;
            year_end: number | null;
            year_start: number | null;
            games_count: number;
            image_background: string;
        };
        released_at: string;
        requirements: {
            minimum?: string;
            recommended?: string;
        };
    }[];
    stores: {
        id: number;
        url: string;
        store: {
            id: number;
            name: string;
            slug: string;
            domain: string;
            games_count: number;
            image_background: string;
        };
    }[];
    developers: {
        id: number;
        name: string;
        slug: string;
        games_count: number;
        image_background: string;
    }[];
    genres: {
        id: number;
        name: string;
        slug: string;
        games_count: number;
        image_background: string;
    }[];
    tags: {
        id: number;
        name: string;
        slug: string;
        language: string;
        games_count: number;
        image_background: string;
    }[];
    publishers: {
        id: number;
        name: string;
        slug: string;
        games_count: number;
        image_background: string;
    }[];
    esrb_rating?: {
        id: number;
        name: string;
        slug: string;
    };
    clip: unknown;
    description_raw: string;
}


export interface List {
    id: string;
    shortId: string;
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
