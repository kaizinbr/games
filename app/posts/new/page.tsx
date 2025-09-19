import GamePostMain from "@/components/post/GamePostMain";

export default async function NewPost(props: { params: { gameId?: string } }) {
    const gameId = props.params.gameId ? Number(props.params.gameId) : 0;

    console.log(gameId);
    return (
        <div className="max-w-2xl mx-auto p-4">
            <h1 className="text-2xl font-bold mb-6">Create New Post</h1>
            <GamePostMain />
        </div>
    );
}
