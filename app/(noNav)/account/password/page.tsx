import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

import ChangePassword from "@/components/account/ChangePassword";
import SetPassword from "@/components/account/SetPassword";

export default async function PasswordPage() {
    const session = await auth();

    if (!session?.user) {
        return (
            <div className="max-w-2xl mx-auto p-4">
                <h1 className="text-2xl font-bold mb-6">Alterar Senha</h1>
                <p>Você precisa estar logado para alterar sua senha.</p>
            </div>
        );
    }

    const user = await prisma.user.findUnique({
        where: { id: session.user.id },
    });

    const hasPassword = !!(user?.password);

    return (
        <div className="max-w-2xl mx-auto p-4">
            <h1 className="text-2xl font-bold mb-6">{hasPassword ? "Alterar Senha" : "Criar Senha"}</h1>
            {hasPassword ? <ChangePassword /> : <SetPassword />}
        </div>
    );
            
}