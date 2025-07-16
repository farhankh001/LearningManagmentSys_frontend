import { useLazyRefreshTokenQuery } from "./app/api/userApi";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUser, clearUser } from "./app/slices/authSlice";

const AuthInitializer = () => {
  const dispatch = useDispatch();
  const [trigger] = useLazyRefreshTokenQuery();

  useEffect(() => {
    const hydrate = async () => {
      try {
        const result = await trigger().unwrap();
        dispatch(setUser({ ...result.user, accessToken: result.accessToken }));
      } catch {
        dispatch(clearUser());
      }
    };

    hydrate();
  }, [trigger, dispatch]);

  return null;
};

export default AuthInitializer;
