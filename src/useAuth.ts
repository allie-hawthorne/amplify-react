import { fetchUserAttributes, type FetchUserAttributesOutput } from "aws-amplify/auth";
import { Hub } from "aws-amplify/utils";
import { useCallback, useEffect, useState } from "react";

export const useAuth = (setPage: (page: string) => void) => {
  const [user, setUser] = useState<FetchUserAttributesOutput>();
  const [loading, setLoading] = useState(false);
 
  const checkUser = useCallback(async () => {
    setLoading(true);
    try {
      const user = await fetchUserAttributes();
      setUser(user);
      setPage('');
    } catch {
      setUser(undefined);
    } finally {
      setLoading(false);
    }
}, [setPage]);

  useEffect(() => {
    checkUser();

    const fn = Hub.listen('auth', checkUser);

    return fn;
  }, [checkUser]);

  return { user, loading };
}