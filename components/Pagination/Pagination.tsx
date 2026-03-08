'use client';

import React from 'react';

// Обов'язково додаємо ці поля в інтерфейс, щоб TS не сварився
interface PaginationProps {
  totalPages: number;
  currentPage: number; 
  onPageChange: (page: number) => void;
}

export default function Pagination({ totalPages, currentPage, onPageChange }: PaginationProps) {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div style={{ display: 'flex', gap: '8px', marginTop: '20px', justifyContent: 'center' }}>
      {pages.map((p) => (
        <button
          key={p}
          onClick={() => onPageChange(p)}
          style={{ 
            padding: '8px 12px',
            fontWeight: currentPage === p ? 'bold' : 'normal',
            backgroundColor: currentPage === p ? '#0070f3' : 'white',
            color: currentPage === p ? 'white' : 'black',
            cursor: 'pointer',
            borderRadius: '4px',
            border: '1px solid #ccc'
          }}
        >
          {p}
        </button>
      ))}
    </div>
  );
}