import NewList from "@/components/list/NewList";

export default async function NewListPage() {
    // const searchParams = await props.searchParams;
    // const gameId = searchParams?.gameId || "";
    // console.log("Game ID in NewListPage:", gameId);

    return (
        <div className="w-full">
            <NewList />
        </div>
    );
}