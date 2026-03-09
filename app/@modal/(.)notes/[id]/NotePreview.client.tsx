'use client';

import React from 'react';

export default function NotePreviewClient({ id }: { id: string }) {
  return (
    <div>
      <h2>Note Preview {id}</h2>
      <p>Content of the note will be here...</p>
    </div>
  );
}