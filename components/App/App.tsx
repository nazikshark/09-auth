'use client';

import { useEffect, useState } from 'react';
import { useAuthStore } from '../../lib/store/authStore';
import { checkSession } from '../../lib/api/clientApi';

export default function App({ children }: { children: React.ReactNode }) {
  const setUser = useAuthStore((state) => state.setUser);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      try {
        // Перевіряємо, чи є у користувача активна кука (сесія)
        const user = await checkSession();
        if (user) {
          setUser(user);
        }
      } catch (error) {
        console.log('No active session found');
      } finally {
        setIsLoading(false);
      }
    };

    initAuth();
  }, [setUser]);

  if (isLoading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', padding: '100px' }}>
        <p>Loading application...</p>
      </div>
    );
  }

  return <>{children}</>;
}