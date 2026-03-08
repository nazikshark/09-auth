'use client';

import { useAuthStore } from '../../../lib/store/authStore';
import Image from 'next/image';
import css from './ProfilePage.module.css';

export default function ProfilePage() {
  const { user } = useAuthStore();

  if (!user) return <p>Access denied. Please log in.</p>;

  return (
    <div className={css.profileContainer}>
      <h1 className={css.title}>My Profile</h1>
      <div className={css.infoCard}>
        <div className={css.avatarWrapper}>
          <Image 
            src={user.avatar || '/default-avatar.png'} 
            alt="Avatar" 
            width={100} 
            height={100} 
            className={css.avatar}
          />
        </div>
        <div className={css.details}>
          <p><strong>Username:</strong> {user.username}</p>
          <p><strong>Email:</strong> {user.email}</p>
        </div>
      </div>
    </div>
  );
}