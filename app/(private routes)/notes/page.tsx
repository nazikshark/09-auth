'use client';

import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchNotes } from '@/lib/api/clientApi';
import NoteList from '@/components/NoteList/NoteList';
import Pagination from '@/components/Pagination/Pagination';
import SearchBox from '@/components/SearchBox/SearchBox';
import Link from 'next/link';

export default function NotesPage() {
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
      setCurrentPage(1);
    }, 500);
    return () => clearTimeout(handler);
  }, [search]);

  const { data, isLoading, isError } = useQuery({
    queryKey: ['notes', currentPage, debouncedSearch],
    queryFn: () => fetchNotes({ page: currentPage, search: debouncedSearch }),
  });

  const notes = data?.notes || [];
  const totalPages = data?.totalPages || 1;

  if (isError) return <div style={{ color: 'red', padding: '20px' }}>Error loading notes</div>;

  return (
    <div style={{ padding: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <SearchBox 
          value={search} 
          onChange={setSearch} 
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

      {isLoading ? (
        <p>Loading notes...</p>
      ) : (
        <>
          <NoteList notes={notes} />
          <Pagination 
            totalPages={totalPages} 
            currentPage={currentPage} 
            onPageChange={(page: number) => setCurrentPage(page)} 
          />
        </>
      )}
    </div>
  );
}