'use client';

import { useRouter } from 'next/navigation';
import styles from './NoteForm.module.css';

interface NoteFormProps {
  initialData?: { title: string; content: string; tag: string };
  onSubmit: (data: { title: string; content: string; tag: string }) => void;
  isPending?: boolean;
}

export default function NoteForm({ initialData, onSubmit, isPending }: NoteFormProps) {
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const data = {
      title: formData.get('title') as string,
      tag: formData.get('tag') as string,
      content: formData.get('content') as string,
    };

    if (!data.title.trim() || !data.content.trim()) return;
    onSubmit(data);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <input
        name="title"
        type="text"
        placeholder="Title"
        className={styles.input}
        defaultValue={initialData?.title || ''}
        required
      />
      <select 
        name="tag"
        className={styles.select}
        defaultValue={initialData?.tag || 'Personal'}
      >
        <option value="Todo">Todo</option>
        <option value="Work">Work</option>
        <option value="Personal">Personal</option>
        <option value="Meeting">Meeting</option>
        <option value="Shopping">Shopping</option>
      </select>
      <textarea
        name="content"
        placeholder="Content"
        className={styles.textarea}
        defaultValue={initialData?.content || ''}
        required
      />
      <div className={styles.actions}>
        <button 
          type="submit" 
          className={styles.button} 
          disabled={isPending}
        >
          {isPending ? 'Saving...' : 'Save'}
        </button>
        <button 
          type="button" 
          className={styles.cancelButton} 
          onClick={() => router.back()}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}