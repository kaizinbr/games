import UserLists from '@/components/profile/UserLists';
import {prisma} from '@/lib/prisma'
import Link from 'next/link'

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

    // const userLists = await axios.get

    return (
        <div className="w-full">
            <h1 className="text-3xl font-bold mb-4">
                {user ? user.user.name || user.user.email : 'User not found'}
            </h1>
            <p className="text-gray-600">{user?.bio || 'No bio available'}</p>
            <Link href={`/${user?.username}/edit`} className="text-blue-500 hover:underline">
                Edit Profile
            </Link>
            <UserLists userId={user?.id || ''} />
        </div>
    );
}