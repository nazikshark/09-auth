'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import styles from './SidebarNotes.module.css';

const TAGS = ['All', 'Work', 'Personal', 'Todo', 'Health'];

export default function SidebarNotes() {
  const searchParams = useSearchParams();
  const currentTag = searchParams.get('tag') || 'All';

  return (
    <aside className={styles.sidebar}>
      <h3 className={styles.title}>Tags</h3>
      <ul className={styles.list}>
        {TAGS.map((tag) => (
          <li key={tag}>
            <Link
              href={tag === 'All' ? '/notes' : `/notes?tag=${tag}`}
              className={currentTag === tag ? styles.active : styles.link}
            >
              {tag}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}