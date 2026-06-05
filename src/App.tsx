import { useState } from 'react'
import { LoginPage } from './LoginPage';
import { signOut } from 'aws-amplify/auth';
import { useAuth } from './useAuth';

function App() {
  const [isLoginPage, setIsLoginPage] = useState(false);
  const user = useAuth();

  if (user) return <>
    <h3>Welcome, {user.given_name}!</h3>
    <button onClick={() => signOut()}>Logout</button>
  </>;
  if (isLoginPage) return <LoginPage setIsLoginPage={setIsLoginPage} />;
  return <button onClick={() => setIsLoginPage(true)}>Login</button>;
}

export default App
