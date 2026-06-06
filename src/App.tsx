import { useAuth } from './useAuth';
import { Navbar } from './Navbar';
import { useState } from 'react';
import { LoginPage } from './LoginPage';
import { Chat } from './Chat';

function App() {
  const [page, setPage] = useState('');
  const { user, loading } = useAuth(setPage);
  
  if (loading) return;

  return <>
  <Navbar user={user} setPage={setPage} />
    <div className="flex flex-col gap-4 items-center justify-center w-full h-full">
      {page === 'login' && <LoginPage setPage={setPage} />}
      {!page && user && <Chat />}
    </div>
  </>;
}

export default App
