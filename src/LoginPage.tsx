import { signIn, signUp } from "aws-amplify/auth";
import { useState } from "react";

interface LoginPageProps {
  setIsLoginPage: (isLoginPage: boolean) => void;
}
export const LoginPage = ({ setIsLoginPage }: LoginPageProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [isRegister, setIsRegister] = useState(false);

  const handleSignUp = async () => {
    await signUp({
      username: email,
      password,
      options: { userAttributes: { email } }
    });
  };

  const handleSignIn = async () => {
    await signIn({
      username: email,
      password,
      options: { userAttributes: { email } }
    });
  };
  
  return <>
    <form onSubmit={e => e.preventDefault()}>
      <input type="email" placeholder='email' value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder='password' value={password} onChange={(e) => setPassword(e.target.value)} />
      {isRegister && (
        <input type="password" placeholder='confirm password' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
      )}
      {isRegister
        ? <button onClick={handleSignUp}>Sign Up</button>
        : <button onClick={handleSignIn}>Sign In</button>
      }
    </form>
    <button onClick={() => setIsRegister(!isRegister)}>
      {isRegister ? 'Already have an account?' : "Don't have an account?"}
    </button>
    <button onClick={() => setIsLoginPage(false)}>Back</button>
  </>;
}