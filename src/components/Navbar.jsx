import * as MaterialIcon from "react-icons/md";
import { NavLink, useNavigate } from "react-router-dom";
import logo from "../assets/img/logo-putih.png";
import { Button } from "@material-tailwind/react";
import { axiosInstance } from "../utils/axios";
import { useUser } from "../hooks/useUser";
import { useSWRConfig } from "swr";

export const Navbar = () => {
  const { user, setUser } = useUser();
  const navigate = useNavigate();
  const { mutate } = useSWRConfig();

  const handleLogout = async () => {
    await axiosInstance.get("/api/auth/logout", {
      withCredentials: true,
    });

    setUser({});
    mutate("/api/user", undefined, { revalidate: false });
    mutate("/api/user/history", undefined, { revalidate: false });
    navigate("/login", { replace: true });
  };

  return (
    <aside className="sticky top-0 h-screen w-20 bg-indigo-700 text-white md:w-96">
      <nav className="flex h-full flex-col border-r shadow-md ">
        <div className="flex items-center justify-between gap-2 px-5 py-3">
          <div className="mx-auto w-52">
            <img src={logo} alt="" onClick={() => console.log(user.roles)} />
          </div>
        </div>
        <div className="flex flex-col items-center gap-5 px-5 py-5 md:items-start">
          <NavLink
            to={"/"}
            className="flex w-min items-center justify-center gap-2 rounded-md px-3 py-3 transition-all hover:bg-indigo-900 md:w-full md:justify-start md:py-2"
          >
            <MaterialIcon.MdOutlineDashboard className="text-2xl md:text-xl" />
            <span className="text-md hidden md:inline">Dashboard</span>
          </NavLink>
          <NavLink
            to={"/profile"}
            className="flex w-min items-center justify-center gap-2 rounded-md  px-3 py-3 transition-all hover:bg-indigo-900 md:w-full  md:justify-start md:py-2"
          >
            <MaterialIcon.MdPermIdentity className="text-2xl md:text-xl" />
            <span className="text-md hidden md:inline">Profile</span>
          </NavLink>
          <NavLink
            to={"/history"}
            className="flex w-min items-center justify-center gap-2  rounded-md px-3 py-3 transition-all hover:bg-indigo-900 md:w-full md:justify-start md:py-2"
          >
            <MaterialIcon.MdHistory className="text-2xl md:text-xl" />
            <span className="text-md hidden md:inline">History</span>
          </NavLink>

          {user?.roles.map((role) => {
            if (role.role === "Admin") {
              return (
                <NavLink
                  key={role}
                  to={"/admin"}
                  className="flex w-min items-center justify-center gap-2 rounded-md px-3 py-3 transition-all hover:bg-indigo-900 md:w-full md:justify-start md:py-2"
                >
                  <MaterialIcon.MdSupervisorAccount className="text-2xl md:text-xl" />
                  <span className="text-md hidden md:inline">Admin</span>
                </NavLink>
              );
            }
            return null;
          })}

          <Button
            onClick={handleLogout}
            className="group flex w-min items-center justify-center gap-2 rounded-md bg-red-100 px-3 py-3 shadow-none transition-all hover:bg-red-300 hover:shadow-none md:w-full md:justify-start md:py-2"
          >
            <MaterialIcon.MdLogout className="text-2xl text-red-500 transition-all group-hover:text-white md:text-xl" />
            <span className="text-md hidden text-red-500 transition-all group-hover:text-white md:inline">
              Keluar
            </span>
          </Button>
        </div>
      </nav>
    </aside>
  );
};
