import { Navigate, Outlet, useLocation } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { Toaster } from "react-hot-toast";
import { useUser } from "../hooks/useUser";

export const RootLayout = () => {
  const { user } = useUser();
  const location = useLocation();
  return user?.accessToken ? (
    <div className="bg-gray-100">
      <div
        className={`m-auto flex  bg-indigo-50 bg-[url('./src/assets/img/bg.png')] bg-contain`}
      >
        <Navbar />
        <Toaster />
        <Outlet />
      </div>
    </div>
  ) : (
    <Navigate to={"/login"} state={{ from: location }} replace />
  );
};
