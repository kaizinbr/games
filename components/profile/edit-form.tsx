"use client";
import React, { useState } from "react";

type Profile = {
    id: string;
    name?: string | null;
    bio?: string | null;
    username: string;
    lowername: string;
    avatarUrl?: string | null;
    pronouns?: string | null;
    site?: string | null;
};

type EditFormProps = {
    profile: Profile | null;
    // fetchProfile: (id: string) => Promise<Profile>;
    // updateProfile: (id: string, data: Partial<Profile>) => Promise<void>;
};

export const EditProfileForm: React.FC<EditFormProps> = ({
    profile,
    // fetchProfile,
    // updateProfile,
}) => {
    // const [profile2, setProfile2] = useState<Profile | null>(profile);
    const [form, setForm] = useState<Partial<Profile>>(profile || {});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // useEffect(() => {
    //     const loadProfile = async () => {
    //         try {
    //             // const data = await fetchProfile(userId);
    //             const data = await prisma.profile.findUnique({
    //                 where: { id: userId },
    //             });
    //             if (data) {
    //                 setProfile(data);
    //                 setForm(data);
    //             }
    //         } catch (err) {
    //             setError("Erro ao carregar perfil");
    //             console.error(err);
    //         }
    //     };
    //     loadProfile();
    // }, [userId]);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    // const handleReset = () => {
    //     setForm(profile ?? {});
    // };

    // const updateProfile = async (id: string, data: Partial<Profile>) => {
    //     await prisma.profile.update({
    //         where: { id },
    //         data,
    //     });
    // };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        try {
            // await updateProfile(userId, form);
            setLoading(false);
        } catch {
            setError("Erro ao atualizar perfil");
            setLoading(false);
        }
    };

    if (!profile) return <div>Carregando...</div>;

    return (
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
            <label>
                Username:
                <input
                    name="username"
                    value={form.username ?? ""}
                    onChange={handleChange}
                    type="text"
                    className="bg-white/20"
                    required
                />
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
                Avatar URL:
                <input
                    name="avatarUrl"
                    value={form.avatarUrl ?? ""}
                    onChange={handleChange}
                    type="text"
                    className="bg-white/20"
                />
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
            <button type="submit" disabled={loading}>
                {loading ? "Salvando..." : "Salvar"}
            </button>
        </form>
    );
};