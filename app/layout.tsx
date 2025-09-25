// app/layout.tsx
import "./globals.css";
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
                    {children}
                </Providers>
            </body>
        </html>
    );
}
