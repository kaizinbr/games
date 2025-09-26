import {prisma} from '@/lib/prisma'
import Link from 'next/link'

import Image from 'next/image';

export default async function ListPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;

    const list = await prisma.list.findUnique({
        where: { shortId: id },
        include: { user: true, games: {
            include: { game: true }
        } },
    });

    console.log(list);

    return (
        <div className="w-full">
            <h1 className="text-3xl font-bold mb-4">
                {list ? list.name : 'List not found'}
            </h1>
            <p className="text-gray-600">{list?.description || 'No description available'}</p>

            <h2 className="text-2xl font-bold mt-6 mb-4">Games in this List</h2>
            {list && list.games.length > 0 ? (
                <ul>
                    {list.games.map((game: any) => (
                        <li key={game.id} className="mb-2">
                            <h3 className="text-xl font-semibold">{game.game.title}</h3>
                            {game.game.coverUrl && (
                                <Image 
                                    src={game.game.coverUrl}    
                                    alt={game.game.title}
                                    width={200}
                                    height={100}
                                    className="my-2"
                                />
                            )}
                            <Link href={`/games/${game.game.rawgId}`} className="text-blue-500 hover:underline">
                                View Game
                            </Link>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No games found in this list.</p>
            )}

            <Link href={`/lists/${list?.shortId}/edit`} className="text-blue-500 hover:underline">
                Edit List
            </Link>
        </div>
    );
}