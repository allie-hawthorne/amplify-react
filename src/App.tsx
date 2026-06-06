import { useAuth } from './useAuth';
import { Navbar } from './Navbar';
import { useState } from 'react';
import { LoginPage } from './LoginPage';

function App() {
  const [page, setPage] = useState('');
  const { user, loading } = useAuth(setPage);
  
  if (loading) return;

  return <>
     <Navbar user={user} setPage={setPage} />
     {page === 'login' && <LoginPage setPage={setPage} />}
  </>;
}

export default App
