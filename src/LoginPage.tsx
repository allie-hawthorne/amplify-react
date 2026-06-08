import { signIn, signUp } from "aws-amplify/auth";
import { useState } from "react";
import { Input, SignInUpButton } from "./shared";

interface LoginPageProps {
  setPage: (page: string) => void;
}
export const LoginPage = ({ setPage }: LoginPageProps) => {
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

  const handleSignIn = () => {
    signIn({
      username: email,
      password,
    });
  };
  
  return <>
    <form className="flex flex-col w-sm gap-4" onSubmit={e => e.preventDefault()}>
      <Input type="email" value={email} setState={setEmail} />
      {isRegister && <Input placeholder="name" value={name} setState={setName}/>}
      <Input type="password" value={password} setState={setPassword} />
      {isRegister && <Input type="password" placeholder="confirm password" value={confirmPassword} setState={setConfirmPassword} />}
      <div className="flex flex-row-reverse w-full justify-between">
        <SignInUpButton isRegister={isRegister} signIn={handleSignIn} signUp={handleSignUp} />
        <button className="text-pink-300 opacity-70" onClick={() => setIsRegister(!isRegister)}>
          {isRegister ? 'Already have an account?' : "Don't have an account?"}
        </button>
      </div>
    </form>
    <button className="cursor-pointer" onClick={() => setPage('')}>Back</button>
  </>;
}