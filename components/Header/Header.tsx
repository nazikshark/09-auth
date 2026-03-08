'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import AuthNavigation from '../AuthNavigation/AuthNavigation';
import styles from './Header.module.css';

export default function Header() {
  const pathname = usePathname();

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link href="/notes" className={styles.logo}>
          NoteHub 📝
        </Link>
        
        <nav className={styles.nav}>
          {pathname.includes('/notes') && (
            <Link 
              href="/notes/action" 
              className={pathname === '/notes/action' ? styles.active : ''}
            >
              + New Note
            </Link>
          )}
          <AuthNavigation />
        </nav>
      </div>
    </header>
  );
}