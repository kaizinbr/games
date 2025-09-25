import AddToList from '@/components/game/AddToList';
import axios from 'axios'

export default async function UserProfile({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;

    const response = await axios.get(
            `https://api.rawg.io/api/games/${id}?key=${
                process.env.RAWG_API_KEY
            }`
        );

        // console.log(response.data);

    return (
        <div className="w-full">
            <h1 className="text-3xl font-bold mb-4">
                {response.data.name}
            </h1>
            <p className="text-gray-600">{response.data.description_raw || 'No description available'}</p>
            <AddToList game={response.data} />            
        </div>
    );
}