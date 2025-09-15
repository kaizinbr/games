"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { Profile } from "@/utils/types";

export default function Header({ profile }: { profile: Profile | null }) {
    const { data: session } = useSession();
    // console.log("Session data in Header:", profile);

    return (
        <header className="w-full bg-white/20 shadow-md py-4 px-8">
            <nav className="flex justify-between items-center">
                <Link
                    href="/"
                    className="text-xl font-bold text-gray-200 hover:text-blue-600 transition-colors"
                >
                    Superblog
                </Link>
                <div className="flex items-center space-x-4">
                    <Link
                        href="/posts"
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
                    >
                        Posts
                    </Link>
                    {session ? (
                        <>
                            <Link
                                href="/posts/new"
                                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
                            >
                                New Post
                            </Link>
                            <Link
                                href={`/${profile?.username || "/me"}`}
                                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
                            >
                                Profile
                            </Link>
                            <div className="flex items-center space-x-4">
                                <div className="text-sm ">
                                    {session.user?.name && (
                                        <div>{session.user.name}</div>
                                    )}
                                    <div>{session.user?.email}</div>
                                </div>
                                <button
                                    onClick={() => signOut()}
                                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
                                >
                                    Sign Out
                                </button>
                            </div>
                        </>
                    ) : (
                        <Link
                            href="/login"
                            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
                        >
                            Sign In
                        </Link>
                    )}
                </div>
            </nav>
        </header>
    );
}
