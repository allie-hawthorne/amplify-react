import { useAuth } from './useAuth';
import { AuthHome } from './AuthHome';
import { UnAuthHome } from './UnAuthHome';

function App() {
  const user = useAuth();

  return user
    ? <AuthHome user={user} />
    : <UnAuthHome />;
}

export default App
