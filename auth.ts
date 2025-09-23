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
            from: "kaizin@kaizin.com.br",
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
        signIn: "/login",
        verifyRequest: "/verify",
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
    debug: true,
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.email = user.email;
                token.name = user.name;
                console.log("User data in auth.ts:", user, token);
            }
            return token;
        },
        async session({ session, token }) {
            if (session.user && token.id) {
                const user = await prisma.user.findUnique({
                    where: { id: String(token.id) },
                });
                if (user) {
                    session.user.id = user.id;
                    session.user.email = user.email;
                    session.user.name = user.name;
                }
            }
            return session;
        },
    },
});
