import { useState } from "react";
import { LoginPage } from "./LoginPage";

export const UnAuthHome = () => {
  const [isLoginPage, setIsLoginPage] = useState(false);

  if (isLoginPage) return <LoginPage setIsLoginPage={setIsLoginPage} />;
  return <button onClick={() => setIsLoginPage(true)}>Login</button>;
}