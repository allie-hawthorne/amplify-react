import { useState } from 'react'
import { LoginPage } from './LoginPage';
import { useAuth } from './useAuth';
import { AuthHome } from './AuthHome';

function App() {
  const [isLoginPage, setIsLoginPage] = useState(false);
  const user = useAuth();

  if (user) return <AuthHome user={user} />;
  if (isLoginPage) return <LoginPage setIsLoginPage={setIsLoginPage} />;
  return <button onClick={() => setIsLoginPage(true)}>Login</button>;
}

export default App
