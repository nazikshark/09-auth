'use client';

import React from 'react';

interface SearchBoxProps {
  value: string;
  onChange: (value: string) => void; 
}

export default function SearchBox({ value, onChange }: SearchBoxProps) {
  return (
    <input
      type="text"
      placeholder="Search notes..."
      value={value}
      onChange={(e) => onChange(e.target.value)} 
      style={{ 
        padding: '10px', 
        width: '250px', 
        borderRadius: '8px', 
        border: '1px solid #ccc' 
      }}
    />
  );
}