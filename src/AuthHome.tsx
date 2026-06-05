import { signOut, type FetchUserAttributesOutput } from "aws-amplify/auth";

interface AuthHomeProps {
  user: FetchUserAttributesOutput;
}
export const AuthHome = ({ user }: AuthHomeProps) => {
  return <>
    <h3>Welcome, {user.given_name}!</h3>
    <button onClick={() => signOut()}>Logout</button>
  </>;
}