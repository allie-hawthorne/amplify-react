import { useState } from "react";

export const UnAuthHome = () => {
  const [isLoginPage, setIsLoginPage] = useState(false);

  if (isLoginPage) return 
  return <button onClick={() => setIsLoginPage(true)}>Login</button>;
}