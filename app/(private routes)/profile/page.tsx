import { serverApi } from '@/lib/api/serverApi';
import Image from 'next/image';
import Link from 'next/link';

export const metadata = {
  title: 'Profile | Notes App',
};

export default async function ProfilePage() {
  const user = await serverApi.getUser();

  return (
    <div className="profile-container">
      <Image 
        src={user.avatarUrl || '/default-avatar.png'} 
        alt="Avatar" 
        width={100} 
        height={100} 
      />
      <h1>{user.username}</h1>
      <p>{user.email}</p>
      <Link href="/profile/edit">Змінити профіль</Link>
    </div>
  );
}