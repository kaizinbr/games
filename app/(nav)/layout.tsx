import HeaderWrapper from "@/components/HeaderWrapper";

export const metadata = {
    title: "Superblog",
    description: "A blog app using Next.js and Prisma",
};

export default function NoNavbarLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen flex flex-col">
            <HeaderWrapper />
            <main className="flex-1">{children}</main>
        </div>
    );
}
