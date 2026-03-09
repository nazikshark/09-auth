'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { clientApi } from '@/lib/api/clientApi';
import { useAuth } from '@/components/AuthProvider/AuthProvider';
import css from './EditProfilePage.module.css';

export default function EditProfilePage() {
  const router = useRouter();
  const { user, setUser } = useAuth();
  const [username, setUsername] = useState(user?.username || '');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const updatedUser = await clientApi.updateMe({ username });
      setUser(updatedUser);
      router.push('/profile');
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={css.container}>
      <h1>Редагувати профіль</h1>

      {user?.avatar && (
        <div className={css.avatarWrapper}>
          <Image
            src={user.avatar}
            alt="User Avatar"
            width={100}
            height={100}
            priority
          />
        </div>
      )}

      <form onSubmit={handleSubmit} className={css.form}>
        <div className={css.field}>
          <label>Email</label>
          <input
            type="email"
            value={user?.email || ''}
            readOnly
            disabled
            className={css.input}
          />
        </div>

        <div className={css.field}>
          <label>Username</label>
          <input
            type="text"
            value={username}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}
            className={css.input}
            required
          />
        </div>

        <div className={css.actions}>
          <button type="submit" disabled={isSubmitting} className={css.saveBtn}>
            Зберегти зміни
          </button>
          <button
            type="button"
            onClick={() => router.back()}
            className={css.cancelBtn}
          >
            Скасувати
          </button>
        </div>
      </form>
    </div>
  );
}