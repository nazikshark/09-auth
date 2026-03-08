'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useParams, useRouter } from 'next/navigation';
import { fetchNoteById, updateNote } from '../../../../../../lib/api/clientApi';
import NoteForm from '../../../../../../components/NoteForm/NoteForm';

export default function EditNotePage() {
  const { id } = useParams();
  const router = useRouter();
  const queryClient = useQueryClient();

  const { data: note, isLoading } = useQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id as string),
  });

  const mutation = useMutation({
    mutationFn: (updatedData: { title: string; content: string; tag: string }) => 
      updateNote(id as string, updatedData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
      queryClient.invalidateQueries({ queryKey: ['note', id] });
      router.push(`/notes/${id}`);
    },
  });

  if (isLoading) return <p style={{ padding: '20px' }}>Loading note...</p>;

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h1>Edit Note</h1>
      <NoteForm 
        initialData={note} 
        onSubmit={(data) => mutation.mutate(data)} 
        isPending={mutation.isPending} 
      />
      {mutation.isError && <p style={{ color: 'red' }}>Error updating note</p>}
    </div>
  );
}