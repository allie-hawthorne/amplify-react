import { fetchUserAttributes, type FetchUserAttributesOutput } from "aws-amplify/auth";
import { Hub } from "aws-amplify/utils";
import { useEffect, useState } from "react";

export const useAuth = (setPage: (page: string) => void) => {
  const [user, setUser] = useState<FetchUserAttributesOutput>();
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    checkUser();

    const fn = Hub.listen('auth', checkUser);

    return fn;
  }, []);

  const checkUser = async () => {
    setLoading(true);
    try {
      const user = await fetchUserAttributes();
      console.log(user);
      setUser(user);
      setPage('');
    } catch {
      setUser(undefined);
    } finally {
      setLoading(false);
    }
  };

  return { user, loading };
}