'use client';

import { useQuery } from '@tanstack/react-query';
import { clientApi } from '@/lib/api/clientApi';

export default function NoteDetailsClient({ id }: { id: string }) {
  const { data: note, isLoading, isError } = useQuery({
    queryKey: ['note', id],
    queryFn: () => clientApi.fetchNotes().then(notes => notes.find(n => n.id === id)),
  });

  if (isLoading) return <div>Завантаження...</div>;
  if (isError || !note) return <div>Нотатку не знайдено</div>;

  return (
    <div className="note-details">
      <h1>{note.title}</h1>
      <div className="tag">{note.tag}</div>
      <p>{note.content}</p>
    </div>
  );
}