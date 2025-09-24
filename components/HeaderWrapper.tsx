
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import Header from "@/components/navigator";

export default async function HeaderWrapper() {
    // const session = await getServerSession(authOptions);
    const session = await auth();
    // console.log("Session data in HeaderWrapper:", session);

    // if (!session?.user) return null;

    let profile = null;
    if (session?.user?.id) {
        const dbProfile = await prisma.profile.findUnique({
            where: { id: session.user.id },
            include: { user: true },
        });
        console.log("DB Profile:", session.user.id);
        if (dbProfile) {
            // Ensure password is always a string
            profile = {
                ...dbProfile,
                user: {
                    ...dbProfile.user,
                    password: dbProfile.user.password ?? "",
                },
            };
        }
    }
    return <Header profile={profile} />;
}
