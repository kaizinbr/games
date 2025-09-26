"use client";

import { useState, useEffect } from "react";
import axios from "axios";

export default function ResetPassword() {
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    function validatePassword(pw: string) {
        const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
        return re.test(pw);
    }

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

        if (!validatePassword(password)) {
            setError("A senha deve ter pelo menos 8 caracteres, incluindo uma letra maiúscula, uma letra minúscula e um número.");
            return;
        }
        if (password !== confirmPassword) {
            setError("As senhas não coincidem.");
            return;
        }

        setLoading(true);
        try {
            const response = await axios.post("/api/account/password/set", { password, confirmPassword });
            if (response.data?.error) {
                setError(response.data.error);
            } else {
                setSuccess("Senha alterada com sucesso.");
                setPassword("");
                setConfirmPassword("");
            }
        } catch {
            setError("Erro de conexão.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="max-w-2xl mx-auto p-4">
            <form className="space-y-6" autoComplete="off" onSubmit={handleSubmit}>
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
