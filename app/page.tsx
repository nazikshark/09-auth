import Link from 'next/link';
import styles from './page.module.css';

export default function HomePage() {
  return (
    <main className={styles.main}>
      <div className={styles.hero}>
        <h1>My Notes App</h1>
        <p>Твій особистий простір для думок та ідей.</p>
        <div className={styles.cta}>
          <Link href="/notes" className={styles.primaryBtn}>
            Перейти до нотаток
          </Link>
          <Link href="/sign-in" className={styles.secondaryBtn}>
            Увійти
          </Link>
        </div>
      </div>
    </main>
  );
}