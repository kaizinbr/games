import { getServerSession } from "next-auth";
import { authOptions } from "@/auth"; // ajuste o caminho conforme seu projeto
import prisma from "@/lib/prisma";
import { EditProfileForm } from "@/components/profile/edit-form";

export default async function EditProfilePage({
    params,
}: {
    params: Promise<{ username: string }>;
}) {
    const session = await getServerSession(authOptions);
    if (!session) {
        return <div>Você precisa estar logado para editar o perfil.</div>;
    }

    const username = (await params).username;

    const profile = await prisma.profile.findUnique({
        where: { lowername: username.toLowerCase() },
        include: { user: true },
    });

    if (!profile || profile.id !== session.user.id) {
        return <div>Você não tem permissão para editar este perfil.</div>;
    }

    // Renderize o formulário de edição aqui
    return (
        <div className="min-h-screen flex flex-col items-center py-24 px-8">
            <span>pode editar</span>
            <EditProfileForm profile={profile} />
        </div>
    );
}
