// app/HeaderWrapper.tsx (Server Component)
// import { getServerSession } from "next-auth";
// import { authOptions } from "@/auth";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import Header from "@/components/navigator";

export default async function HeaderWrapper() {
    // const session = await getServerSession(authOptions);
    const session = await auth();

    if (!session?.user) return null;
    console.log("Session data in HeaderWrapper:", session);

    let profile = null;
    if (session?.user?.id) {
        profile = await prisma.profile.findUnique({
            where: { id: session.user.id },
            include: { user: true },
        });
    }
    return <Header profile={profile} />;
}
