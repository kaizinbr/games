import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import Resend from "next-auth/providers/resend";
import { prisma } from "@/lib/prisma";

import bcrypt from "bcryptjs";
import { fakerPT_BR } from "@faker-js/faker";

type Credentials = {
    email: string;
    name?: string;
    password: string;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function parseCredentials(raw: any): Credentials {
    if (typeof raw?.email === "string" && typeof raw?.password === "string") {
        return {
            email: raw.email,
            name: typeof raw.name === "string" ? raw.name : undefined,
            password: raw.password,
        };
    }
    throw new Error("Credenciais inválidas");
}

export const { auth, handlers, signIn, signOut } = NextAuth({
    adapter: PrismaAdapter(prisma),
    providers: [
        Resend({
            from: "noreply@kaizin.com.br",
        }),
        CredentialsProvider({
            name: "credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                name: { label: "Name", type: "name" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                const creds = parseCredentials(credentials);
                if (!creds?.email || !creds?.password) return null;

                const user = await prisma.user.findUnique({
                    where: { email: creds.email },
                });

                if (!user) {
                    const animal = fakerPT_BR.animal.type();
                    const tempUsername = fakerPT_BR.internet.username({
                        firstName: creds.name?.substring(0, 10),
                        lastName: animal,
                    });
                    const newUser = await prisma.user.create({
                        data: {
                            name: creds.name ?? creds.email,
                            email: creds.email,
                            password: await bcrypt.hash(creds.password, 10),
                            Profile: {
                                create: {
                                    username: tempUsername,
                                    lowername: tempUsername.toLowerCase(),
                                    bio: "",
                                    avatarUrl: "",
                                },
                            },
                        },
                    });

                    return {
                        id: newUser.id,
                        email: newUser.email,
                        name: newUser.name,
                    };
                }

                if (!user.password) {
                    throw new Error("Invalid credentials 1");
                }
                const isCorrectPassword = await bcrypt.compare(
                    creds.password,
                    user.password
                );

                if (!isCorrectPassword) {
                    throw new Error("Invalid credentials");
                }

                return {
                    id: user.id,
                    email: user.email,
                    name: user.name,
                };
            },
        }),
    ],
    pages: {
        signIn: "/resend",
        verifyRequest: "/verify",
        newUser: "/new-user",
    },
    cookies: {
        sessionToken: {
            name: `next-auth.session-token`,
            options: {
                httpOnly: true,
                sameSite: "lax",
                path: "/",
                secure: process.env.NODE_ENV === "production" ? true : false,
            },
        },
    },
    // debug: true,
    secret: process.env.AUTH_SECRET,
    session: {
        strategy: "jwt",
        maxAge: 30 * 24 * 60 * 60, // 30 days
    },
    events: {
        async createUser({ user }) {
            // criar um perfil automaticamente quando criar um usuario, evita conflitos
            const animal = fakerPT_BR.animal.type();
            const color = fakerPT_BR.color.human();
            const tempUsername = fakerPT_BR.internet.username({
                firstName: user.name?.substring(0, 10) ?? color + user.email?.substring(0, 5),
                lastName: animal,
            });
            await prisma.profile.create({
                data: {
                    username: tempUsername,
                    lowername: tempUsername.toLowerCase(),
                    bio: "",
                    avatarUrl: "",
                    user: { connect: { id: user.id } },
                },
            });
        },
    },
    callbacks: {
        async jwt({ token, user }) {
            // console.log("JWT callback:", { token, user });
            if (user) {
                token.id = user.id;
                token.email = user.email;
                token.name = user.name;
            }
            return token;
        },

        async session({ session, token }) {
            // console.log("Session callback:", { session, token });
            if (session.user && token.id) {
                session.user.id = String(token.id);
                session.user.email = token.email ?? "";
                session.user.name = token.name;
            }
            return session;
        },
    },
});
