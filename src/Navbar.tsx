import { signOut, type FetchUserAttributesOutput } from "aws-amplify/auth";

interface NavbarProps {
  user: FetchUserAttributesOutput | undefined;
  setPage: (page: string) => void;
}
export const Navbar = ({ user, setPage }: NavbarProps) => {  
  return <div className='flex justify-end gap-4 p-2 bg-gray-900 text-pink-300 shadow-2xl shadow-pink-300/40'>
    {user
      ? <>
        <h3>Welcome, {user.given_name}!</h3>
        <button className="cursor-pointer hover:opacity-70" onClick={() => signOut()}>Logout</button>
      </>
      : <button className="cursor-pointer" onClick={() => setPage('login')}>Login</button>
    }
  </div>;
}