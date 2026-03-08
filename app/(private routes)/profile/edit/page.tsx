'use client';

import { useState } from 'react';
import { useAuthStore } from '../../../../lib/store/authStore';
import { updateMe } from '../../../../lib/api/clientApi';
import { useRouter } from 'next/navigation';
import css from './EditProfilePage.module.css';

export default function EditProfilePage() {
  const { user, setUser } = useAuthStore();
  const [name, setName] = useState(user?.username || '');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const updatedUser = await updateMe({ username: name });
      setUser(updatedUser);
      router.push('/profile');
    } catch (error) {
      console.error('Update failed', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={css.container}>
      <h1>Edit Profile</h1>
      <form onSubmit={handleSubmit} className={css.form}>
        <div className={css.field}>
          <label>Username</label>
          <input 
            type="text" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            className={css.input}
          />
        </div>
        <button type="submit" disabled={isSubmitting} className={css.saveBtn}>
          {isSubmitting ? 'Saving...' : 'Save Changes'}
        </button>
      </form>
    </div>
  );
}