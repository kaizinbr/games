"use client";

import { useState, useEffect } from "react";

import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import { Profile, RawgGame, GamePost, ListGame } from "@/utils/types";

export default function ResultsPage({
    query,
    tab,
}: {
    query: string;
    tab: string;
}) {
    const [loading, setLoading] = useState(false);

    const [users, setUsers] = useState<Profile[]>([]);
    const [games, setGames] = useState<RawgGame[]>([]);
    const [lists, setLists] = useState<ListGame[]>([]);
    const [posts, setPosts] = useState<GamePost[]>([]);

    useEffect(() => {
        const searchAction = async () => {
            setLoading(true);
            if (query == "") {
                console.log("empty");
                setGames([]);
                setUsers([]);
                setLists([]);
                setPosts([]);

                setLoading(false);
            } else {
                const response = await axios.get(
                    `/api/search?q=${query}&type=${tab}`
                );
                const data = response.data;
                console.log(data);
                if (tab === "games") {
                    setGames(data.results);
                    console.log(games);
                } else if (tab === "posts") {
                    setPosts(data.results);
                } else if (tab === "lists") {
                    setLists(data.results);
                } else if (tab === "profiles") {
                    setUsers(data.results);
                }

                setLoading(false);
            }
        };
        searchAction();
    }, [query, tab]);

    return (
        <div className="flex flex-col w-full px-4 mt-29 md:mt-32 gap-6">
            <div className="flex flex-col w-full gap-3">
                {tab === "games" &&
                    games.map((game) => (
                        // <Link
                        //     key={game.id}
                        //     href={`/game/${game.id}`}
                        //     className="flex flex-row items-center gap-3 p-2 rounded-xl hover:bg-shark-800 bg-transparent transition-all duration-300"
                        // >
                        //     <Image
                        //         className="w-10 h-10 rounded-md"
                        //         src={game.images[2]?.url}
                        //         alt={game.name}
                        //         width={40}
                        //         height={40}
                        //     />
                        //     <div className="flex flex-col">
                        //         <h3 className="text-left font-semibold">
                        //             {album.name}
                        //         </h3>
                        //         <span className="text-sm text-shark-300">
                        //             {album.artists
                        //                 .map((artist) => artist.name)
                        //                 .join(", ")}
                        //         </span>
                        //     </div>
                        // </Link>
                        <Link
                            key={game.id}
                            href={`/games/${game.id}`}
                            className="text-left font-semibold"
                        >
                            {game.name} - {game.released}
                        </Link>
                    ))}

                {/* {tab === "tracks" &&
                    tracksResults.map((track) => (
                        <Link
                            key={track.id}
                            className="flex flex-row items-center gap-3 p-2 rounded-xl hover:bg-shark-800 bg-transparent transition-all duration-300"
                            href={`/album/${track.album.id}`}
                        >
                            <Image
                                className="w-10 h-10 rounded-md"
                                src={track.album.images[2]?.url}
                                alt={track.name}
                                width={40}
                                height={40}
                            />

                            <div className="flex flex-col">
                                <h3 className="text-left font-semibold flex flex-row gap-1 items-center">
                                    {track.explicit ? (
                                        <BsExplicitFill className="text-shark-500 size-3" />
                                    ) : null}
                                    {track.name}
                                </h3>
                                <span className="text-sm text-shark-300">
                                    {track.artists
                                        .map((artist) => artist.name)
                                        .join(", ")}
                                </span>
                            </div>
                        </Link>
                    ))}
                {tab === "artists" &&
                    artistResults.map((artist) => (
                        <Link
                            key={artist.id}
                            className="flex flex-row items-center p-2 rounded-xl hover:bg-shark-800 bg-transparent transition-all duration-300"
                            href={`/artist/${artist.id}`}
                        >
                            <Image
                                className="w-10 h-10 rounded-full"
                                src={artist.images[0]?.url}
                                alt={artist.name}
                                width={40}
                                height={40}
                            />
                            <p className="ml-3 text-left  font-semibold">
                                {artist.name}
                            </p>
                        </Link>
                    ))}/}

                {tab === "profiles" &&
                    users.map((user) => (
                        <UserCard
                            key={user.id}
                            data={{
                                avatar_url: user.avatar_url,
                                name: user.name,
                                username: user.username,
                                verified: user.verified,
                            }}
                        />
                    ))} *

                {tab === "games" && games.length === 0 && !loading && (
                    <div className="flex flex-col items-center justify-center w-full ">
                        <h1 className=" text-sm text-shark-300">
                            Nenhum resultado encontrado
                        </h1>
                    </div>
                )}

                {/* {tab === "tracks" && tracksResults.length === 0 && !loading && (
                    <div className="flex flex-col items-center justify-center w-full ">
                        <h1 className=" text-sm text-shark-300">
                            Nenhum resultado encontrado
                        </h1>
                    </div>
                )}

                {tab === "artists" && artistResults.length === 0 && !loading && (
                    <div className="flex flex-col items-center justify-center w-full ">
                        <h1 className=" text-sm text-shark-300">
                            Nenhum resultado encontrado
                        </h1>
                    </div>
                )} */}

                {tab === "profiles" &&
                    users.map((user) => (
                        <div
                            key={user.id}
                            className="flex flex-row items-center gap-3 p-2 rounded-xl hover:bg-shark-800 bg-transparent transition-all duration-300"
                        >
                            <Image
                                className="w-10 h-10 rounded-full"
                                src={user.avatarUrl || "/default-avatar.png"}
                                alt={user.username}
                                width={40}
                                height={40}
                            />
                            <div className="flex flex-col">
                                <h3 className="text-left font-semibold">
                                    {user.name || user.username}
                                </h3>
                            </div>
                        </div>
                    ))}

                {tab === "profiles" && users.length === 0 && !loading && (
                    <div className="flex flex-col items-center justify-center w-full ">
                        <h1 className=" text-sm text-shark-300">
                            Nenhum resultado encontrado
                        </h1>
                    </div>
                )}
            </div>
        </div>
    );
}
