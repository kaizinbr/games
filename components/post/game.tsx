import axios from 'axios';
import { Game } from '@/utils/types';
import AddToList from '../game/AddToList';
import { useState, useEffect } from 'react';

import { createPost } from '@/components/post/actions';

export default function GamePost({ gameId }: { gameId: string }) {
    const [game, setGame] = useState<Game | null>(null);

    useEffect(() => {
        const fetchGame = async () => {
            const response = await axios.get(`/api/games/${gameId}`);
            setGame(response.data);
        };

        fetchGame();
    }, [gameId]);

    if (!game) return <div>Loading...</div>;

    return (
        <div>
            <h2 className="text-xl font-bold">{game.title}</h2>
        </div>
    );
}
