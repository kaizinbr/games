import Link from "next/link";

export default function AccountPage() {
    return (
        <div className="max-w-2xl mx-auto p-4">
            <h1 className="text-2xl font-bold mb-6">Configurações de Conta</h1>
            <div className="flex flex-col gap-4">
                <Link href="/account/edit" className=" hover:underline">
                    Editar Perfil
                </Link>
                <Link href="/account/lists" className=" hover:underline">
                    Minhas Listas
                </Link>
                <Link href="/account/password" className=" hover:underline">
                    Alterar Senha
                </Link>
                <Link href="/account/help" className=" hover:underline">
                    Ajuda
                </Link>
                <Link href="/account/delete" className="text-red-400 hover:underline">
                    Deletar Conta
                </Link>

            </div>
        </div>
    );
}