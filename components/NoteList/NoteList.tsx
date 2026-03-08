import { Note } from '@/types/note';
import NoteCard from '../NotePreview/NotePreview';
import styles from './NoteList.module.css';

interface NoteListProps {
  notes: Note[];
}

export default function NoteList({ notes }: NoteListProps) {
  if (notes.length === 0) {
    return <p className={styles.empty}>No notes found.</p>;
  }

  return (
    <div className={styles.list}>
      {notes.map((note) => (
        <NoteCard key={note.id} note={note} />
      ))}
    </div>
  );
}