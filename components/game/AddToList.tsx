"use client";
import axios from "axios";
import { useState, useEffect } from "react";
import { List, RawgGame } from "@/utils/types";

export default function AddToList({ game }: { game: RawgGame }) {
    const [lists, setLists] = useState<List[]>([]);

    console.log(game);

    useEffect(() => {
        const fetchLists = async () => {
            const response = await axios.get("/api/lists/current-user-lists");
            setLists(response.data);
            console.log(response.data);
        };
        fetchLists();
    }, []);

    const handleAddToList = async (listId: string) => {
        const response = await axios.post("/api/lists/toggle-to-list", {
            listId,
            gameId: game.id,
            title: game.name,
            coverUrl: game.background_image,
            genre: [],
            platform: [],
            publisher: [],
            releaseDate: game.released,
            playtime: game.playtime || 0,
        });
        console.log(response.data);
    };

    return (
        <div>
            <h2>Add to List</h2>
            <ul>
                {lists.map((list) => (
                    <li key={list.id}>
                        <button onClick={() => handleAddToList(list.id)}>
                            {list.name}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
