import { signIn, signUp } from "aws-amplify/auth";
import { useState } from "react";

interface LoginPageProps {
  setIsLoginPage: (isLoginPage: boolean) => void;
}
export const LoginPage = ({ setIsLoginPage }: LoginPageProps) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [isRegister, setIsRegister] = useState(false);

  const handleSignUp = async () => {
    const res = await signUp({
      username: email,
      password,
      options: { userAttributes: { email, given_name: name } }
    });

    if (res.isSignUpComplete) handleSignIn();
  };

  const handleSignIn = async () => {
    await signIn({
      username: email,
      password,
    });
  };
  
  return <>
    <form onSubmit={e => e.preventDefault()}>
      <input type="email" placeholder='email' value={email} onChange={(e) => setEmail(e.target.value)} />
      {isRegister && <input placeholder='name' value={name} onChange={(e) => setName(e.target.value)} />}
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