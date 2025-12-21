export default function Loading() {
  return (
    <>
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes loading-spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          .loading-spinner {
            animation: loading-spin 1s linear infinite;
          }
        `
      }} />
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        background: 'black'
      }}>
        <div 
          className="loading-spinner"
          style={{
            width: '50px',
            height: '50px',
            border: '3px solid rgba(255, 255, 255, 0.1)',
            borderTop: '3px solid rgba(255, 255, 255, 0.6)',
            borderRadius: '50%'
          }} 
        />
      </div>
    </>
  );
}

