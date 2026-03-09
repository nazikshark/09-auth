'use client';

import { useQuery } from '@tanstack/react-query';
import { clientApi } from '@/lib/api/clientApi';
import { useRouter } from 'next/navigation';

export default function NotePreviewClient({ id }: { id: string }) {
  const router = useRouter();
  const { data: note, isLoading } = useQuery({
    queryKey: ['note', id],
    queryFn: () => clientApi.fetchNotes().then(notes => notes.find(n => n.id === id)),
  });

  if (isLoading) return null;

  return (
    <div className="modal-overlay" onClick={() => router.back()}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={() => router.back()}>✕</button>
        {note ? (
          <>
            <h2>{note.title}</h2>
            <p>{note.content}</p>
            <small>{note.tag}</small>
          </>
        ) : (
          <p>Нотатку не знайдено</p>
        )}
      </div>
    </div>
  );
}