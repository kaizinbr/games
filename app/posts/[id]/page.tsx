// export const dynamic = "force-dynamic"; // This disables SSG and ISR

import prisma from "@/lib/prisma";
import { notFound, redirect } from "next/navigation";

export default async function Post({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;

    const post = await prisma.gamePost.findUnique({
        where: { shortId: id },
        include: {
            user: true,
        },
    });

    if (!post) {
        notFound();
    }

    // Server action to delete the post
    async function deletePost() {
        "use server";

        await prisma.gamePost.delete({
            where: {
                shortId: id,
            },
        });

        redirect("/posts");
    }

    return (
        <div className="min-h-screen  flex flex-col items-center justify-center p-8">
            <article className="max-w-3xl w-full shadow-lg rounded-lg p-8">

                {/* Author Information */}
                <p className="text-lg  mb-4">
                    by{" "}
                    <span className="font-medium text-gray-200">
                        {post.user?.name || "Anonymous"}
                    </span>
                </p>

                {/* Content Section */}
                <div className="text-lg text-gray-200 leading-relaxed space-y-6 border-t pt-6">
                    {post.content ? (
                        <p>{post.content}</p>
                    ) : (
                        <p className="italic text-gray-300">
                            No content available for this post.
                        </p>
                    )}
                </div>
            </article>

            {/* Delete Button */}
            <form action={deletePost} className="mt-6">
                <button
                    type="submit"
                    className="px-6 py-3 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition-colors"
                >
                    Delete Post
                </button>
            </form>
        </div>
    );
}
