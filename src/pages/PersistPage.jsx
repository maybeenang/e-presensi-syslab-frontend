import { useEffect, useState } from "react";
import { useRefreshToken } from "../hooks/useRefreshToken";
import { useUser } from "../hooks/useUser";
import { LoadingPage } from "./LoadingPage";
import { Outlet } from "react-router-dom";

export const PersistPage = () => {
  const [loading, setLoading] = useState(true);
  const refresh = useRefreshToken();
  const { user } = useUser();

  useEffect(() => {
    const verifyToken = async () => {
      try {
        await refresh();
      } catch (error) {
        null;
      } finally {
        setLoading(false);
      }
    };

    !user?.accessToken ? verifyToken() : setLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <>{loading ? <LoadingPage /> : <Outlet />}</>;
};
