'use client';

import Link from 'next/link';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteNote } from '../../lib/api/clientApi';
import { Note } from '@/types/note';
import styles from './NotePreview.module.css';

export default function NotePreview({ note }: { note: Note }) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: () => deleteNote(note.id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
    },
  });

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <span className={styles.tag}>{note.tag}</span>
        <button 
          onClick={() => mutation.mutate()} 
          className={styles.deleteBtn}
          disabled={mutation.isPending}
        >
          ×
        </button>
      </div>
      <Link href={`/notes/${note.id}`} className={styles.content}>
        <h3>{note.title}</h3>
        <p>{note.content.substring(0, 60)}...</p>
      </Link>
    </div>
  );
}