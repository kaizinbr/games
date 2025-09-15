// app/layout.tsx
import "./globals.css";
import HeaderWrapper from "@/components/HeaderWrapper";
import Providers from "./providers";

export const metadata = {
    title: "Superblog",
    description: "A blog app using Next.js and Prisma",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="pt-br">
            <body>
                <Providers>
                    <div className="min-h-screen flex flex-col">
                        <HeaderWrapper />
                        <main className="flex-1">{children}</main>
                    </div>
                </Providers>
            </body>
        </html>
    );
}
