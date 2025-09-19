import { getServerSession } from "next-auth";
import { authOptions } from "@/auth"; // ajuste o caminho conforme seu projeto
import prisma from "@/lib/prisma";

export default async function EditListPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const session = await getServerSession(authOptions);
    if (!session) {
        return <div>Você precisa estar logado para editar o perfil.</div>;
    }

    const { id } = await params;

    const list = await prisma.list.findUnique({
        where: { shortId: id },
        include: { user: true },
    });

    if (!list || list.userId !== session.user.id) {
        return <div>Você não tem permissão para editar esta lista.</div>;
    }

    return (
        <div className="min-h-screen flex flex-col items-center py-24 px-8">
            <span>pode editar</span>
            {/* <EditProfileForm profile={profile} /> */}
        </div>
    );
}
