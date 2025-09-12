import prisma from '@/lib/prisma'


export default async function UserProfile({
    params,
}: {
    params: Promise<{ username: string }>;
}) {
    const username = (await params).username;

    const user = await prisma.profile.findUnique({
        where: { lowername: username.toLowerCase() },
        include: { user: true },
    });

    return (
        <div className="w-full">
            <h1 className="text-3xl font-bold mb-4">
                {user ? user.user.name || user.user.email : 'User not found'}
            </h1>
            <p className="text-gray-600">{user?.bio || 'No bio available'}</p>
            
        </div>
    );
}