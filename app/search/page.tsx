import SearchLayout from "@/components/search/Search";
import ResultsPage from "@/components/search/Results";

export const metadata = {
    title: "Pesquisa | Pitchforkd",
    description: "Avalie álbuns de música e veja o que a comunidade acha deles",
};

export default async function Page(props: {
    searchParams?: Promise<{
        q?: string;
        tab?: string;
    }>;
}) {
    const searchParams = await props.searchParams;
    const query = searchParams?.q || "";
    const tab = searchParams?.tab || "games"; 

    return (
        <div className="flex-1 w-full flex flex-col gap-8 items-center  mx-auto max-w-2xl py-5 md:mt-16">
            <SearchLayout query={query} tab={tab} />

            <ResultsPage query={query} tab={tab} />
        </div>
    );
}