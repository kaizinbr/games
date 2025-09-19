"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDebouncedCallback } from "use-debounce";
import containsSpecialChars from "@/utils/containsSpecialsChars";
import AvatarUpload from "@/components/profile/AvatarUploader";

type Profile = {
    id: string;
    name?: string | null;
    bio?: string | null;
    username: string;
    lowername: string;
    avatarUrl?: string | null;
    pronouns?: string | null;
    site?: string | null;
    favoriteGenre?: string | null;
    age?: number | null;
};

type EditFormProps = {
    profile: Profile | null;
    // fetchProfile: (id: string) => Promise<Profile>;
    // updateProfile: (id: string, data: Partial<Profile>) => Promise<void>;
};

export const EditProfileForm: React.FC<EditFormProps> = ({
    profile,
}) => {
    console.log("Profile in EditProfileForm:", profile);
    const [form, setForm] = useState<Partial<Profile>>(profile || {});
    const [usernameAvailable, setUsernameAvailable] = useState<boolean | null>(
        null
    );
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const checkUsernameAvailability = useDebouncedCallback(
        async (username: string) => {
            if (!username) {
                setUsernameAvailable(null);
                return;
            } else if (username === profile?.username) {
                setUsernameAvailable(null);
                return;
            } else if (containsSpecialChars(username)) {
                setUsernameAvailable(false);
                return;
            }
            // Simulate an API call
            try {
                const response = await axios.get(
                    "/api/profile/check-username",
                    { params: { username } }
                );
                setUsernameAvailable(response.data.available);
                console.log("Username availability:", response.data.available);
            } catch (error) {
                console.error("Error checking username availability", error);
                setUsernameAvailable(null);
            }
        },
        500
    );

    useEffect(() => {
        checkUsernameAvailability(form.username || "");
    }, [form.username, checkUsernameAvailability]);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;

        setForm((prev) => ({ ...prev, [name]: value }));
    };

    // const handleReset = () => {
    //     setForm(profile ?? {});
    // };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        try {
            if (usernameAvailable === false) {
                setError("Username indisponível ou inválido");
                setLoading(false);
                return;
            }
            await axios.post("/api/profile/update", {
                id: profile?.id,
                data: form,
            });
            // await updateProfile(profile!.id, form);
            // const updatedProfile = await fetchProfile(profile!.id);
            // setProfile2(updatedProfile);
            setLoading(false);
        } catch (err) {
            setError("Erro ao atualizar perfil");
            console.error("Error updating profile:", err);
            setLoading(false);
        }
    };

    if (!profile) return <div>Carregando...</div>;

    return (
        <>
            <AvatarUpload initialUrl={form.avatarUrl!} />
            <form className="flex flex-col gap-2 " onSubmit={handleSubmit}>
                <h2>Editar Perfil</h2>
                {error && <div style={{ color: "red" }}>{error}</div>}
                <label>
                    Nome:
                    <input
                        name="name"
                        value={form.name ?? ""}
                        onChange={handleChange}
                        type="text"
                        className="bg-white/20"
                    />
                </label>
                <label className="flex flex-col">
                    Username:
                    <input
                        name="username"
                        value={form.username ?? ""}
                        onChange={handleChange}
                        type="text"
                        className={`
                            
                            ${
                                usernameAvailable === null
                                    ? "bg-white/20"
                                    : usernameAvailable
                                    ? "bg-green-700"
                                    : "bg-red-700"
                            }
                        `}
                        required
                    />
                    {usernameAvailable === null ? null : usernameAvailable ? (
                        <span style={{ color: "green" }}>Disponível</span>
                    ) : (
                        <span style={{ color: "red" }}>Indisponível</span>
                    )}
                </label>
                <label>
                    Bio:
                    <textarea
                        name="bio"
                        value={form.bio ?? ""}
                        onChange={handleChange}
                        className="bg-white/20"
                    />
                </label>
                <label>
                    Tipo faavorito de jogos:
                    <select
                        name="favoriteGenre"
                        value={form.favoriteGenre ?? ""}
                        onChange={handleChange}
                        className="bg-white/20"
                    >
                        <option value="">Selecione</option>
                        <option value="RPG">RPG</option>
                        <option value="Ação">Ação</option>
                        <option value="Aventura">Aventura</option>
                        <option value="Estratégia">Estratégia</option>
                        <option value="Esportes">Esportes</option>
                        <option value="Simulação">Simulação</option>
                        <option value="Puzzle">Puzzle</option>
                        <option value="Outro">Outro</option>
                    </select>
                </label>
                <label>
                    Pronomes:
                    <input
                        name="pronouns"
                        value={form.pronouns ?? ""}
                        onChange={handleChange}
                        type="text"
                        className="bg-white/20"
                    />
                </label>
                <label>
                    Site:
                    <input
                        name="site"
                        value={form.site ?? ""}
                        onChange={handleChange}
                        type="text"
                        className="bg-white/20"
                    />
                </label>
                <label>
                    Idade:
                    <input

                        name="age"
                        value={form.age ?? ""}
                        onChange={handleChange}
                        type="number"
                        className="bg-white/20"
                    />
                </label>
                {/* <button type="button" onClick={handleReset} disabled={loading}>
                    Reset
                </button> */}
                <button
                    type="submit"
                    disabled={loading || usernameAvailable === false}
                >
                    {loading ? "Salvando..." : "Salvar"}
                </button>
            </form>
        </>
    );
};
