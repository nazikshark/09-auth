'use client';

import React from 'react';
import Link from 'next/link';
import { Note } from '@/types/note';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { clientApi } from '@/lib/api/clientApi';

interface NoteListProps {
  notes: Note[];
  isLoading: boolean;
}

export default function NoteList({ notes, isLoading }: NoteListProps) {
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: clientApi.deleteNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
    },
  });

  if (isLoading) return <div>Завантаження нотаток...</div>;
  if (notes.length === 0) return <div>Список порожній</div>;

  return (
    <div className="note-list">
      {notes.map((note) => (
        <div key={note.id} className="note-card">
          <Link href={`/notes/${note.id}`}>
            <h3>{note.title}</h3>
            <p>{note.content.substring(0, 100)}...</p>
            <span>{note.tag}</span>
          </Link>
          <button 
            onClick={() => deleteMutation.mutate(note.id)}
            disabled={deleteMutation.isPending}
          >
            Видалити
          </button>
        </div>
      ))}
    </div>
  );
}