import { Breadcrumbs, Button, Spinner } from "@material-tailwind/react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useUserDetailAdmin } from "../hooks/useUserDetailAdmin";
import { useJabatan } from "../hooks/useJabatan";
import { useEffect, useState } from "react";
import { HistoryTableAdmin } from "../components/HistoryTableAdmin";
import { AbsenTableAdmin } from "../components/AbsenTableAdmin";
import { toast } from "react-hot-toast";
import { useAxiosPrivate } from "../hooks/useAxiosPrivate";
import { useUser } from "../hooks/useUser";

export const AdminUserDetail = () => {
  const param = useParams();
  const { user } = useUser();
  const { id } = param;

  const { data, error, isLoading } = useUserDetailAdmin({ params: id });

  const {
    data: jabatan,
    isLoading: isLoadingJabatan,
    error: isErrorJabatan,
  } = useJabatan();

  const [input, setInput] = useState({
    id: data?.id,
    nama: data?.nama,
    jabatan: data?.jabatanId,
    email: data?.email,
    alamat: data?.alamat,
  });

  const axiosPrivateInstance = useAxiosPrivate();
  const navigate = useNavigate();

  const handleInput = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    setInput({
      id: data?.id,
      nama: data?.nama,
      jabatan: data?.jabatanId,
      email: data?.email,
      alamat: data?.alamat,
    });
  }, [data]);

  if (error) {
    return (
      <>
        <div className="grid h-screen w-full place-items-center">
          <div className="text-center">
            <h1 className="text-center">Something went wrong</h1>
            <Button
              color="blue"
              variant="text"
              onClick={() => navigate(-1, { replace: true })}
            >
              Kembali
            </Button>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      {isLoading ? (
        <div className="grid h-screen w-full place-items-center">
          <Spinner className="h-16 w-16 text-blue-500/10" />
        </div>
      ) : (
        <div className="w-full overflow-y-auto p-5">
          <h1 className="border-b-2 text-2xl font-semibold">Admin</h1>
          <Breadcrumbs className="px-0">
            <Link to="/admin" className="opacity-60">
              Admin
            </Link>
            <Link to="/admin/user" className="opacity-60">
              User
            </Link>
            <Link to="#">Detail</Link>
          </Breadcrumbs>
          <h1 className="mt-5 text-4xl font-semibold">Detail</h1>
          <div className="flex flex-col gap-5">
            <div className="mt-5 w-full max-w-xl">
              <div className="">
                <div className="flex justify-between">
                  <label htmlFor="nama" className="font-medium text-gray-700">
                    NIP
                  </label>
                </div>
                <div className="mt-2 ">
                  <input
                    type="text"
                    disabled
                    name="nip"
                    id="nip"
                    required
                    defaultValue={data?.nip}
                    className="block w-full rounded-md border-0 p-2  text-gray-900 ring-1 ring-inset ring-gray-400 transition focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-5"
                  />
                </div>
              </div>
              <div className="mt-5">
                <div className="flex justify-between">
                  <label htmlFor="nama" className="font-medium text-gray-700">
                    Nama Lengkap
                  </label>
                </div>
                <div className="mt-2 ">
                  <input
                    type="text"
                    name="nama"
                    id="nama"
                    required
                    defaultValue={data?.nama}
                    onChange={handleInput}
                    className="block w-full rounded-md border-0 p-2  text-gray-900 ring-1 ring-inset ring-gray-400 transition focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-5"
                  />
                </div>
              </div>
              <div className="mt-5">
                <div className="flex justify-between">
                  <label
                    htmlFor="jabatanId"
                    className="font-medium text-gray-700"
                  >
                    Jabatan
                  </label>
                </div>
                <div className="mt-2 ">
                  <select
                    name="jabatanId"
                    id="jabatanId"
                    required
                    placeholder="Pilih jabatan"
                    defaultValue={
                      data?.jabatanId != null ? data?.jabatanId : ""
                    }
                    onChange={handleInput}
                    className="w-full rounded-md border-0 p-2  text-gray-900 ring-1 ring-inset ring-gray-400 transition focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-5"
                  >
                    <option name="jabatan">Pilih jabatan</option>
                    {isLoadingJabatan ? (
                      <option name="jabatan">Loading...</option>
                    ) : isErrorJabatan ? (
                      <option name="jabatan">Error</option>
                    ) : (
                      jabatan?.map((item) => (
                        <option key={item.id} value={item.id} name="jabatan">
                          {item.jabatan}
                        </option>
                      ))
                    )}
                  </select>
                </div>
              </div>
              <div className="mt-5">
                <div className="flex justify-between">
                  <label htmlFor="email" className="font-medium text-gray-700">
                    Email
                  </label>
                </div>
                <div className="mt-2 ">
                  <input
                    type="email"
                    name="email"
                    id="email"
                    required
                    defaultValue={data?.email}
                    onChange={handleInput}
                    className="block w-full rounded-md border-0 p-2  text-gray-900 ring-1 ring-inset ring-gray-400 transition focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-5"
                  />
                </div>
              </div>
              <div className="mt-5">
                <div className="flex justify-between">
                  <label htmlFor="alamat" className="font-medium text-gray-700">
                    Alamat
                  </label>
                </div>
                <div className="mt-2 ">
                  <textarea
                    type="text"
                    name="alamat"
                    id="alamat"
                    required
                    defaultValue={data?.alamat}
                    onChange={handleInput}
                    className="block h-20 w-full rounded-md border-0 p-2 text-start text-gray-900 ring-1 ring-inset ring-gray-400 transition focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 "
                  />
                </div>
              </div>
              <div className="w-full text-right">
                <Button
                  color="green"
                  size="md"
                  className="mx-auto mt-5 w-full rounded-md shadow-none lg:w-1/2"
                  onClick={() => {
                    toast.promise(
                      axiosPrivateInstance
                        .post("/api/admin/user", input, {
                          withCredentials: true,
                          headers: {
                            Authorization: `Bearer ${user?.accessToken}`,
                          },
                        })
                        .then((res) => {
                          return res.data.message;
                        }),
                      {
                        loading: "Loading",
                        success: (res) => {
                          toast.remove();
                          return res;
                        },
                        error: (err) => {
                          if (!err?.response) {
                            return "Something went wrong";
                          }
                          toast.remove();
                          return err.response.data.error;
                        },
                      },
                    );
                  }}
                >
                  Simpan
                </Button>
              </div>
            </div>
          </div>
          <AbsenTableAdmin data={data?.absen} />
          <HistoryTableAdmin data={data?.history} />
        </div>
      )}
    </>
  );
};
