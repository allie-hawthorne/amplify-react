import type { ButtonHTMLAttributes, InputHTMLAttributes, PropsWithChildren } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  setState: (v: string) => void
}
export const Input = ({setState, ...inputProps}: InputProps) => {
  const {type, placeholder} = inputProps
  return <input className="bg-gray-700 p-2 rounded-lg" {...inputProps} placeholder={placeholder ?? type} onChange={e => setState(e.target.value)} />;
}

export const Button = ({children, ...buttonProps}: PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>>) => {
  return <button className="bg-pink-300 py-2 px-4 rounded-2xl" {...buttonProps}>{children}</button>
}

interface SignInUpButtonProps {
  isRegister: boolean,
  signIn: () => void,
  signUp: () => void,
}
export const SignInUpButton = ({isRegister, signIn, signUp}: SignInUpButtonProps) => {
  return <Button className="bg-pink-300 py-2 px-4 rounded-2xl" type="submit" onClick={isRegister ? signUp : signIn}>
    Sign {isRegister ? "Up" : "In"}
  </Button>;
}
