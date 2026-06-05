import { fetchUserAttributes, type FetchUserAttributesOutput } from "aws-amplify/auth";
import { Hub } from "aws-amplify/utils";
import { useEffect, useState } from "react";

export const useAuth = () => {
  const [user, setUser] = useState<FetchUserAttributesOutput>();

  useEffect(() => {
    checkUser();

    const fn = Hub.listen('auth', checkUser);

    return fn;
  }, []);

  const checkUser = async () => {
    try {
      const user = await fetchUserAttributes();
      setUser(user);
    } catch {
      setUser(undefined);
    }
  };

  return user;
}