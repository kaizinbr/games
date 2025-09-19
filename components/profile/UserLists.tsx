"use client";
import axios from "axios";
import { useState, useEffect } from "react";
import { List } from "@/utils/types";
import Link from "next/link";   

export default function UserLists({ userId }: { userId: string }) {
    const [lists, setLists] = useState<List[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    console.log(userId);
    useEffect(() => {
        const fetchLists = async () => {
            try {
                const response = await axios.get(`/api/lists/user-lists`, {
                    params: { userId },
                });
                setLists(response.data);
                console.log(response.data);
            } catch (err) {
                setError("Failed to fetch lists");
                console.error(err);
            } finally {
                setLoading(false);
            }   
        };
        fetchLists();
    }, [userId]);

    if (loading) return <p>Loading lists...</p>;
    if (error) return <p>{error}</p>;
    if (lists.length === 0) return <p>No lists found.</p>;
    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">User Lists</h2>
            <ul>
                {lists.map((list) => (
                    <li key={list.id} className="mb-2">
                        <h3 className="text-xl font-semibold">{list.name}</h3>
                        <p className="text-gray-600">{list.description}</p>
                        <Link href={`/lists/${list.shortId}`} className="text-blue-500 hover:underline">
                            View List
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}