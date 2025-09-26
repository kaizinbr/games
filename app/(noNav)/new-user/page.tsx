import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { EditProfileForm } from "@/components/profile/edit-form";

export default async function NewUserPage() {
    const session = await auth();   

    if (!session?.user) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen py-2">
                <h1 className="text-4xl font-bold mb-4">Ocorreu um erro</h1>  
                <p className="text-lg mb-8">
                    Não conseguimos processar corretamente seus dados, tente fazer login novamente.
                </p>
            </div>
        );
    }

    const user = await prisma.user.findUnique({
        where: { id: session.user.id || undefined },
        include: { Profile: true },
    });


    console.log("NewUserPage session:", session);
    console.log("NewUserPage user:", user);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1 className="text-4xl font-bold mb-4">Welcome to Superblog!</h1>

            <EditProfileForm profile={user?.Profile} />
        </div>
    );
}