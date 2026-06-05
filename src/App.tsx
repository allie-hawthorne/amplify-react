import { useState } from 'react'
import { signUp } from 'aws-amplify/auth';
import './App.css'


function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = async () => {
    await signUp({
      username: email,
      password,
      options: { userAttributes: { email } }
    });
  };
  
  return <>
    <form onSubmit={e => e.preventDefault()}>
      <input type="email" placeholder='email' value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder='password' value={password} onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleSignUp}>Sign Up</button>
    </form>
  </>;
  }

export default App
