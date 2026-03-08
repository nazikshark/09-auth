import Link from 'next/link';

export default function NotFound() {
  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center', 
      height: '100vh',
      textAlign: 'center' 
    }}>
      <h1 style={{ fontSize: '4rem', margin: 0 }}>404</h1>
      <p style={{ fontSize: '1.2rem' }}>Ой! Здається, ви загубилися.</p>
      <Link href="/" style={{ 
        marginTop: '20px', 
        padding: '10px 20px', 
        background: '#0070f3', 
        color: 'white', 
        borderRadius: '5px',
        textDecoration: 'none'
      }}>
        Повернутися додому
      </Link>
    </div>
  );
}