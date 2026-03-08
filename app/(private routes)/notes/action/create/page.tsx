'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createNote } from '../../../../../lib/api/clientApi';
import NoteForm from '../../../../../components/NoteForm/NoteForm';

export default function CreateNotePage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (data: { title: string; content: string }) => {
    try {
      await createNote(data);
      router.push('/notes');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to create note');
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h1>Create New Note</h1>
      <NoteForm onSubmit={handleSubmit} />
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}