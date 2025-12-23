'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Error logged by Next.js internally
  }, [error]);

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      padding: '20px',
      background: 'black',
      color: '#fff',
      textAlign: 'center'
    }}>
      <h2 style={{ marginBottom: '20px' }}>Something went wrong!</h2>
      {process.env.NODE_ENV === 'development' && error.message && (
        <p style={{ marginBottom: '20px', color: 'rgba(255, 255, 255, 0.6)' }}>
          {error.message}
        </p>
      )}
      <button
        onClick={reset}
        style={{
          padding: '10px 20px',
          background: 'rgba(255, 255, 255, 0.1)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          borderRadius: '8px',
          color: '#fff',
          cursor: 'pointer',
          transition: 'background 0.3s ease'
        }}
        onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)'}
        onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'}
      >
        Try again
      </button>
    </div>
  );
}

