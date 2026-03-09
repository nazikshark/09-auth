'use client';

import { useQuery } from '@tanstack/react-query';
import { clientApi } from '@/lib/api/clientApi';
import { useRouter } from 'next/navigation';
import Modal from '@/components/Modal/Modal';

export default function NotePreviewClient({ id }: { id: string }) {
  const router = useRouter();

  const { data: note, isLoading, isError } = useQuery({
    queryKey: ['note', id],
    queryFn: () => clientApi.fetchNoteById(id),
  });

  const handleClose = () => {
    router.back();
  };

  if (isLoading) {
    return (
      <Modal onClose={handleClose}>
        <div className="loading">Завантаження...</div>
      </Modal>
    );
  }

  if (isError || !note) {
    return (
      <Modal onClose={handleClose}>
        <div className="error">Помилка завантаження або нотатку не знайдено</div>
      </Modal>
    );
  }

  return (
    <Modal onClose={handleClose}>
      <div className="note-preview">
        <h2>{note.title}</h2>
        <div className="tag">{note.tag}</div>
        <p>{note.content}</p>
      </div>
    </Modal>
  );
}