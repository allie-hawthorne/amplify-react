import { useState } from 'react'
import { LoginPage } from './LoginPage';

function App() {
  const [isLoginPage, setIsLoginPage] = useState(false);

  return <>
    {isLoginPage
      ? <LoginPage setIsLoginPage={setIsLoginPage} />
      : <button onClick={() => setIsLoginPage(true)}>Login</button>
    }
  </>
}

export default App
