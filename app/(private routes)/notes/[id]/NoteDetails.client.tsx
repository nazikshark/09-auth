'use client';

import { use } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getNoteById, deleteNote } from '@/lib/api/clientApi';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function NoteDetailsClient({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const queryClient = useQueryClient();

  const { data: note, isLoading } = useQuery({
    queryKey: ['note', id],
    queryFn: () => getNoteById(id),
  });

  const mutation = useMutation({
    mutationFn: () => deleteNote(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
      router.push('/notes');
    },
  });

  if (isLoading) return <p>Loading note...</p>;
  if (!note) return <p>Note not found</p>;

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ marginBottom: '20px', display: 'flex', gap: '10px' }}>
        <button onClick={() => router.push('/notes')}>← Back</button>
        <Link 
          href={`/notes/action/edit/${id}`}
          style={{ 
            padding: '5px 15px', 
            backgroundColor: '#ffaa00', 
            color: 'black', 
            borderRadius: '4px', 
            textDecoration: 'none',
            fontSize: '14px'
          }}
        >
          Edit Note
        </Link>
        <button 
          onClick={() => { if(confirm('Delete?')) mutation.mutate() }}
          style={{ backgroundColor: '#ff4444', color: 'white', border: 'none', padding: '5px 15px', borderRadius: '4px', cursor: 'pointer' }}
          disabled={mutation.isPending}
        >
          {mutation.isPending ? 'Deleting...' : 'Delete'}
        </button>
      </div>

      <h1 style={{ fontSize: '2rem', marginBottom: '10px' }}>{note.title}</h1>
      <span style={{ background: '#eee', padding: '4px 8px', borderRadius: '4px' }}>{note.tag}</span>
      
      <div style={{ 
        marginTop: '30px', 
        padding: '20px', 
        background: '#f9f9f9', 
        borderRadius: '8px',
        lineHeight: '1.6',
        whiteSpace: 'pre-wrap'
      }}>
        {note.content}
      </div>
    </div>
  );
}