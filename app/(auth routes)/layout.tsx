import React from 'react';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      flexDirection: 'column',
      alignItems: 'center', 
      justifyContent: 'center', 
      background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
      padding: '20px'
    }}>
      <div style={{ 
        width: '100%', 
        maxWidth: '400px', 
        backgroundColor: 'white', 
        padding: '40px', 
        borderRadius: '12px', 
        boxShadow: '0 10px 25px rgba(0,0,0,0.1)' 
      }}>
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#333' }}>
            My Notes App
          </h2>
          <p style={{ color: '#666', marginTop: '8px' }}>
            Ласкаво просимо!
          </p>
        </div>
        
        {children}
      </div>
      
      <p style={{ marginTop: '20px', color: '#666', fontSize: '14px' }}>
        &copy; 2026 Всі права захищені
      </p>
    </div>
  );
}