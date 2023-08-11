import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/img/logo.png";
import { useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import { axiosInstance } from "../utils/axios";

export const RegisterPage = () => {
  const navigate = useNavigate();

  const [data, setData] = useState({
    nip: "",
    password: "",
    nama: "",
    email: "",
  });

  const handleInput = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    toast
      .promise(
        axiosInstance.post("/api/auth/register", data, {
          withCredentials: true,
        }),
        {
          loading: "Loading",
          success: () => {
            return "Register Success";
          },
          error: (err) => {
            return err.response.data.error;
          },
        },
      )
      .then(() => {
        navigate("/login");
      });
  };

  return (
    <div className="flex h-screen flex-col justify-center bg-indigo-50 px-6 py-12 lg:px-8">
      <Toaster />
      <div className=" sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          src={logo}
          alt="logo"
          className=" mx-auto mb-5 h-10 w-auto sm:h-16"
        />
        <h2 className=" text-center text-3xl font-bold text-indigo-500">
          e-Presensi
        </h2>
        <p className="text-center text-indigo-800">Cabang Lampung </p>
      </div>
      <form action="" className="">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm ">
          <div className="mt-3">
            <label
              htmlFor="nip"
              className="font-medium text-gray-700 after:text-red-500 after:content-['*']"
            >
              NIP
            </label>
            <div className="mt-1">
              <input
                type="text"
                name="nip"
                id="nip"
                required
                autoFocus
                onChange={handleInput}
                value={data?.nip}
                className="block w-full rounded-md border-0 p-2  text-gray-900 ring-1 ring-inset ring-gray-400 transition focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-5"
              />
            </div>
          </div>
          <div className="mt-3">
            <label
              htmlFor="nama"
              className="font-medium text-gray-700 after:text-red-500 after:content-['*']"
            >
              Nama Lengkap
            </label>
            <div className="mt-1">
              <input
                type="text"
                name="nama"
                id="nama"
                required
                onChange={handleInput}
                value={data?.nama}
                className="block w-full rounded-md border-0 p-2  text-gray-900 ring-1 ring-inset ring-gray-400 transition focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-5"
              />
            </div>
          </div>
          <div className="mt-3 ">
            <label
              htmlFor="email"
              className="font-medium text-gray-700 after:text-red-500 after:content-['*']"
            >
              Email
            </label>
            <div className="mt-1">
              <input
                type="email"
                name="email"
                id="email"
                required
                onChange={handleInput}
                value={data?.email}
                className="block w-full rounded-md border-0 p-2  text-gray-900 ring-1 ring-inset ring-gray-400 transition focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-5"
              />
            </div>
          </div>
          <div className="mt-3">
            <div className="flex justify-between">
              <label
                htmlFor="password"
                className="font-medium text-gray-700 after:text-red-500 after:content-['*']"
              >
                Password
              </label>
            </div>
            <div className="mt-1">
              <input
                type="password"
                name="password"
                id="password"
                required
                onChange={handleInput}
                value={data?.password}
                className="block w-full rounded-md border-0 p-2  text-gray-900 ring-1 ring-inset ring-gray-400 transition focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-5"
              />
            </div>
          </div>

          <div className="mt-5">
            <button
              type="submit"
              onClick={handleSubmit}
              className="mt-6 flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base  font-semibold  text-white transition hover:bg-indigo-500 focus:border-indigo-700 focus:outline-none "
            >
              Daftar
            </button>
          </div>
          <p className="mt-3 text-center text-gray-700">
            Sudah punya akun?{" "}
            <Link to="/login" className=" text-indigo-500">
              Masuk
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};
