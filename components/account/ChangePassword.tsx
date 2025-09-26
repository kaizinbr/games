"use client";

import { useState, useEffect } from "react";
import axios from "axios";

const passwordRequirements = [
    {
        label: "Mínimo de 8 caracteres",
        test: (pw: string) => pw.length >= 8,
    },
    {
        label: "Pelo menos uma letra maiúscula",
        test: (pw: string) => /[A-Z]/.test(pw),
    },
    {
        label: "Pelo menos uma letra minúscula",
        test: (pw: string) => /[a-z]/.test(pw),
    },
    {
        label: "Pelo menos um número",
        test: (pw: string) => /\d/.test(pw),
    },
];

export default function SetPassword() {
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const [oldPassword, setOldPassword] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [requirementsStatus, setRequirementsStatus] = useState<boolean[]>(passwordRequirements.map(() => false));


    useEffect(() => {
        setRequirementsStatus(passwordRequirements.map(req => req.test(password)));
    }, [password]);

    useEffect(() => {
        if (password !== confirmPassword && confirmPassword.length > 0) {
            setError("As senhas não coincidem.");
        } else {
            setError(null);
        }
    }, [password, confirmPassword]);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setError(null);
        setSuccess(null);

        
        if (requirementsStatus.some(r => !r)) {
            setError("A senha não atende todos os requisitos.");
            return;
        }
        if (password !== confirmPassword) {
            setError("As senhas não coincidem.");
            return;
        }

        setLoading(true);
        try {
            const response = await axios.post("/api/account/password/change", { oldPassword, password, confirmPassword });
            if (response.data?.error) {
                setError(response.data.error);
            } else {
                setSuccess("Senha alterada com sucesso.");
                setOldPassword("");
                setPassword("");
                setConfirmPassword("");
            }
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                setError(error.response?.data?.error || "Erro ao alterar a senha.");
            } else {
                setError("Erro ao alterar a senha.");
            }
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="max-w-2xl mx-auto p-4">
            <form className="space-y-6" autoComplete="off" onSubmit={handleSubmit}>
                
                <div className="mb-4">
                    <label htmlFor="old-password" className="block text-sm font-medium ">
                        Senha Antiga
                    </label>
                    <input
                        type="password"
                        name="old-password"
                        id="old-password"
                        required
                        className="mt-1 block w-full border border-gray-700 rounded-md shadow-sm focus:ring focus:ring-opacity-50"
                        value={oldPassword}
                        autoComplete="new-password"
                        aria-autocomplete="none"
                        onChange={(e) => setOldPassword(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="password" className="block text-sm font-medium ">
                        Nova Senha
                    </label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        required
                        className="mt-1 block w-full border border-gray-700 rounded-md shadow-sm focus:ring focus:ring-opacity-50"
                        value={password}
                        autoComplete="new-password"
                        aria-autocomplete="none"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Requisitos da senha:</label>
                    <ul className="list-disc pl-5">
                        {passwordRequirements.map((req, idx) => (
                            <li key={req.label} className={requirementsStatus[idx] ? "text-green-600" : "text-gray-500"}>
                                {req.label}
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="mb-4">
                    <label htmlFor="confirm-password" className="block text-sm font-medium ">
                        Confirmar Nova Senha
                    </label>
                    <input
                        type="password"
                        name="confirm-password"
                        id="confirm-password"
                        required
                        className="mt-1 block w-full border border-gray-700 rounded-md shadow-sm focus:ring focus:ring-opacity-50"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </div>
                {error && <p className="text-red-500">{error}</p>}
                {success && <p className="text-green-500">{success}</p>}
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded-md"
                    disabled={loading}
                >
                    {loading ? "Processando..." : "Mudar Senha"}
                </button>
            </form>
        </div>
    );
}
