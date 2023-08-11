import { Navigate, Outlet } from "react-router-dom";
import { useUser } from "../hooks/useUser";

export const ProtectedPage = () => {
  const { user } = useUser();

  return (
    <>
      {user?.roles[0]?.role === "Admin" || user?.roles[1]?.role === "Admin" ? (
        <Outlet />
      ) : (
        <Navigate to={"/"} replace={true} />
      )}
    </>
  );
};
