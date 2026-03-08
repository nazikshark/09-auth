'use client';

import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchNotes } from '@/lib/api/clientApi';
import NoteList from '@/components/NoteList/NoteList';
import Pagination from '@/components/Pagination/Pagination';
import SearchBox from '@/components/SearchBox/SearchBox';
import Link from 'next/link';

interface NotesClientProps {
  tag: string;
  initialPage: number;
}

export default function NotesClient({ tag, initialPage }: NotesClientProps) {
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(initialPage);

  useEffect(() => {
    setCurrentPage(initialPage);
  }, [initialPage]);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
      setCurrentPage(1); 
    }, 500);
    return () => clearTimeout(handler);
  }, [search]);

  const { data, isLoading, isError } = useQuery({
    queryKey: ['notes', currentPage, debouncedSearch, tag],
    queryFn: () => fetchNotes({ 
      page: currentPage, 
      search: debouncedSearch, 
      tag: tag === 'all' ? undefined : tag 
    }), 
  });

  const notes = data?.notes || [];
  const totalPages = data?.totalPages || 1;
  const hasNotes = notes.length > 0;

  return (
    <div style={{ padding: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <SearchBox 
          value={search} 
          onChange={(value: string) => setSearch(value)}
        />
        
        <Link 
          href="/notes/action/create" 
          style={{ 
            padding: '10px 20px', 
            backgroundColor: '#0070f3', 
            color: 'white', 
            borderRadius: '5px', 
            textDecoration: 'none' 
          }}
        >
          + Create Note
        </Link>
      </div>

      {isError && <p style={{ color: 'red' }}>Error loading notes.</p>}

      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          {hasNotes ? <NoteList notes={notes} /> : <p>No notes found.</p>}
          
          {hasNotes && (
            <Pagination 
              totalPages={totalPages} 
              currentPage={currentPage} 
              onPageChange={(page: number) => setCurrentPage(page)} 
            />
          )}
        </>
      )}
    </div>
  );
}