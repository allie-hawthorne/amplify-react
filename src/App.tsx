import { useEffect, useState } from 'react'
import { LoginPage } from './LoginPage';
import { fetchUserAttributes, signOut, type FetchUserAttributesOutput } from 'aws-amplify/auth';
import { Hub } from 'aws-amplify/utils';

function App() {
  const [isLoginPage, setIsLoginPage] = useState(false);
  const [user, setUser] = useState<FetchUserAttributesOutput>();

  useEffect(() => {
    checkUser();

    const fn = Hub.listen('auth', checkUser);

    return fn;
  }, []);

  const checkUser = async () => {
    try {
      const user = await fetchUserAttributes();
      setUser(user);
    } catch {
      setUser(undefined);
    }
  };
  
  if (user) return <>
    <h3>Welcome, {user.given_name}!</h3>
    <button onClick={() => signOut()}>Logout</button>
  </>;
  if (isLoginPage) return <LoginPage setIsLoginPage={setIsLoginPage} />;
  return <button onClick={() => setIsLoginPage(true)}>Login</button>;
}

export default App
