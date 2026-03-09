'use client';

import React from 'react';
import { useNoteStore } from '@/lib/store/noteStore';
import { useRouter } from 'next/navigation';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { clientApi } from '@/lib/api/clientApi';

const TAG_OPTIONS = ['Todo', 'Work', 'Personal', 'Meeting', 'Shopping'];

export default function NoteForm() {
  const { draft, setDraft, resetDraft } = useNoteStore();
  const router = useRouter();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (newNote: { title: string; content: string; tag: string }) => 
      clientApi.createNote(newNote),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
      resetDraft();
      router.push('/notes');
    }
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutation.mutate(draft);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="text"
        value={draft.title} 
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDraft({ title: e.target.value })} 
        placeholder="Заголовок"
        required
      />
      
      <textarea 
        value={draft.content} 
        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setDraft({ content: e.target.value })} 
        placeholder="Вміст нотатки..."
        required
      />

      <select 
        value={draft.tag} 
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setDraft({ tag: e.target.value })}
        required
      >
        <option value="" disabled>Оберіть тег</option>
        {TAG_OPTIONS.map((tag) => (
          <option key={tag} value={tag}>
            {tag}
          </option>
        ))}
      </select>

      <button type="submit" disabled={mutation.isPending}>
        {mutation.isPending ? 'Збереження...' : 'Зберегти'}
      </button>
      
      <button type="button" onClick={() => router.back()}>
        Скасувати
      </button>
    </form>
  );
}