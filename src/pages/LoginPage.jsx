import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import logo from "../assets/img/logo.png";
import { Toaster, toast } from "react-hot-toast";
import { useEffect, useRef, useState } from "react";
import { axiosInstance } from "../utils/axios";
import { useUser } from "../hooks/useUser";
import { useRefreshToken } from "../hooks/useRefreshToken";
import { LoadingPage } from "./LoadingPage";

export const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { from } = location.state || { from: { pathname: "/" } };
  const { user, setUser } = useUser();

  const [data, setData] = useState({
    nip: "",
    password: "",
  });

  const [loading, setLoading] = useState(true);

  const inputRef = useRef(null);
  const inputRef2 = useRef(null);

  const refresh = useRefreshToken();

  const handleInput = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      toast.promise(
        axiosInstance.post("/api/auth/login", data, {
          withCredentials: true,
        }),
        {
          loading: "Loading",
          success: (response) => {
            setUser(response.data);
            navigate(from, { replace: true });
            return "Login Success";
          },
          error: (err) => {
            if (!err?.response) {
              return "Something went wrong";
            }
            return err.response?.data.error;
          },
        },
      );
    } catch (err) {
      toast.remove();
      toast.error(err);
    }
  };

  useEffect(() => {
    const refreshToken = async () => {
      try {
        await refresh();
      } catch (error) {
        null;
      } finally {
        setLoading(false);
      }
    };
    !user?.accessToken ? refreshToken() : setLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return loading ? (
    <LoadingPage />
  ) : !user?.accessToken ? (
    <div className="flex h-screen flex-col justify-center bg-indigo-50 px-6 py-12 lg:px-8">
      <Toaster />
      <div className=" sm:mx-auto sm:w-full sm:max-w-sm">
        <img src={logo} alt="logo" className=" mx-auto mb-5 h-16 w-auto" />
        <h2 className="text-center text-3xl font-bold leading-9 tracking-tight  text-indigo-600">
          e-Presensi
        </h2>
        <p className="text-center text-indigo-800">Cabang Lampung </p>
      </div>
      <form action="" className="">
        <div className="mt-5  sm:mx-auto sm:w-full sm:max-w-sm ">
          <div>
            <label htmlFor="nip" className="font-medium text-gray-700">
              NIP
            </label>
            <div className="mt-2 ">
              <input
                type="text"
                ref={inputRef2}
                name="nip"
                id="nip"
                required
                value={data?.nip}
                autoFocus
                onChange={handleInput}
                className="block w-full rounded-md border-0 p-2  text-gray-900 ring-1 ring-inset ring-gray-400 transition focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-5"
              />
            </div>
          </div>
          <div className="mt-5">
            <div className="flex justify-between">
              <label htmlFor="password" className="font-medium text-gray-700">
                Password
              </label>
              <p
                className="cursor-pointer font-medium text-indigo-500"
                onClick={(e) => {
                  e.preventDefault(), toast.remove(), toast("Comming Soon");
                }}
              >
                Lupa password?
              </p>
            </div>
            <div className="mt-2 ">
              <input
                type="password"
                name="password"
                id="password"
                required
                value={data?.password}
                onChange={handleInput}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    inputRef.current.click();
                    e.preventDefault();
                  }
                }}
                className="block w-full rounded-md border-0 p-2  text-gray-900 ring-1 ring-inset ring-gray-400 transition focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-5"
              />
            </div>
          </div>
          <div className="mt-5">
            <button
              onClick={handleSubmit}
              ref={inputRef}
              type="submit"
              className="mt-6 flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base  font-semibold  text-white transition hover:bg-indigo-500 focus:border-indigo-700 focus:outline-none "
            >
              Masuk
            </button>
            <p className="mt-3 text-center text-gray-700">
              Belum punya akun?{" "}
              <Link to="/register" className=" text-indigo-500">
                Daftar
              </Link>
            </p>
          </div>
        </div>
      </form>
      <div className="mt-20 ">
        <p className="text-center text-sm text-gray-500">
          Kuliah Praktik ITERA 2023 | Sistem Presensi
        </p>
      </div>
    </div>
  ) : (
    <Navigate to={"/"} replace />
  );
};
