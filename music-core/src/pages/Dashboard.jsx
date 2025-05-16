import React, { Suspense } from 'react';
const MusicLibrary = React.lazy(() => import('./MusicLibrary'));


function Dashboard() {
  return (
    <Suspense fallback={<div style={styles.container}>Loading...</div>}>
      <MusicLibrary />
    </Suspense>
  );
}

const styles = {
  container: {
  display: "flex",
  justifyContent: "center", 
  alignItems: "center",    
  height: "100vh",
  width: "100vw"
  }
}

export default Dashboard;