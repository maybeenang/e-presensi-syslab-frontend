import {
  Avatar,
  Button,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
  Spinner,
} from "@material-tailwind/react";
import userAv from "../assets/img/userProfile.jpg";
import * as MaterialIcon from "react-icons/md";
import { toast } from "react-hot-toast";
import { useUserProfile } from "../hooks/useUserProfile";
import { useJabatan } from "../hooks/useJabatan";
import { useEffect, useRef, useState } from "react";
import { useAxiosPrivate } from "../hooks/useAxiosPrivate";
import { useUser } from "../hooks/useUser";
import { useSWRConfig } from "swr";

export const ProfilePage = () => {
  const { data, isLoading, error, mutate: mutateProfile } = useUserProfile();
  const { user } = useUser();
  const { mutate } = useSWRConfig();

  const inputFile = useRef(null);

  const [input, setInput] = useState({
    id: data?.id,
    nip: data?.nip,
    nama: data?.nama,
    jabatanId: data?.jabatanId,
    email: data?.email,
    alamat: data?.alamat,
  });

  const {
    data: jabatan,
    isLoading: isLoadingJabatan,
    error: isErrorJabatan,
  } = useJabatan();

  const axiosPrivateInstance = useAxiosPrivate();

  const handleInput = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleImage = async (e) => {
    const image = e.target.files[0];
    if (image) {
      const formData = new FormData();
      formData.append("image", image);
      formData.append("id", data?.id);

      try {
        toast("Loading...");
        const response = await axiosPrivateInstance.post(
          "/api/user/upload-picture",
          formData,
          {
            withCredentials: true,
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${user?.accessToken}`,
            },
          },
        );

        const fethcer = (url) =>
          axiosPrivateInstance
            .get(url, {
              withCredentials: true,
              headers: {
                Authorization: `Bearer ${user?.accessToken}`,
              },
            })
            .then((res) => res.data);

        mutateProfile("/api/user", fethcer);

        toast.remove();
        toast.success(response.data.message);
      } catch (error) {
        toast.remove();
        toast.error("Gagal mengubah foto profile");
      }
    }
  };

  const handleDeleteImage = async () => {
    try {
      toast("Loading...");
      const response = await axiosPrivateInstance.delete(
        `/api/user/upload-picture/delete/${data?.id}`,
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${user?.accessToken}`,
          },
        },
      );

      const fethcer = (url) =>
        axiosPrivateInstance
          .get(url, {
            withCredentials: true,
            headers: {
              Authorization: `Bearer ${user?.accessToken}`,
            },
          })
          .then((res) => res.data);

      mutateProfile("/api/user", fethcer);

      toast.remove();
      toast.success(response.data.message);
    } catch (error) {
      toast.remove();
      toast.error("Gagal menghapus foto profile");
    }
  };

  useEffect(() => {
    setInput({
      id: data?.id,
      nip: data?.nip,
      nama: data?.nama,
      jabatanId: data?.jabatanId,
      email: data?.email,
      alamat: data?.alamat,
    });
  }, [data]);

  if (error) {
    return (
      <>
        <div className="grid h-screen w-full place-items-center">
          <div>
            <h1>Something went wrong</h1>
            <Button
              color="blue"
              variant="text"
              onClick={() => window.location.reload()}
            >
              Refresh
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
        <div className="w-full overflow-y-auto  p-5">
          <h1 className="border-b-2 text-2xl font-semibold">Profile</h1>
          <div className="mx-auto  flex w-full flex-col gap-5 px-0 py-5 lg:flex-row">
            <div className="flex h-fit w-full flex-col items-center justify-center gap-5">
              <Avatar
                src={data?.profile_url ? data?.profile_url : userAv}
                alt="User Profile"
                className="h-40 w-40 ring-2 ring-black md:h-96 md:w-96 "
              />
              <Menu>
                <MenuHandler>
                  <Button
                    color="indigo"
                    size="sm"
                    className="flex gap-2  rounded-md px-8 py-3 shadow-none"
                    onClick={() => toast("Fitur ini belum tersedia")}
                  >
                    <MaterialIcon.MdEdit className="material-icons" />
                    <p className="">Upload foto</p>
                  </Button>
                </MenuHandler>
                <MenuList>
                  <MenuItem
                    onClick={() => {
                      inputFile.current.click();
                    }}
                  >
                    Upload Foto
                  </MenuItem>

                  {data?.profile_url && (
                    <MenuItem
                      className="text-red-200"
                      onClick={handleDeleteImage}
                    >
                      Hapus Foto
                    </MenuItem>
                  )}
                </MenuList>
              </Menu>

              <input
                type="file"
                name="avatar"
                id="avatar"
                accept="image/*"
                hidden
                ref={inputFile}
                onChange={handleImage}
              />
            </div>
            <div className="mx-auto w-full max-w-xl">
              <div className="">
                <div className="flex justify-between">
                  <label htmlFor="nip" className="font-medium text-gray-700">
                    NIP
                  </label>
                </div>
                <div className="mt-2 ">
                  <input
                    type="text"
                    name="nip"
                    id="nip"
                    disabled
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
                    defaultValue={data?.jabatanId ? data?.jabatanId : ""}
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
                    defaultValue={data?.alamat ? data?.alamat : "-"}
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
                    if (input.id === "") {
                      toast.error("Something went wrong");
                      return;
                    }

                    if (input.jabatanId === "") {
                      toast.error("Pilih jabatan");
                      return;
                    }

                    toast
                      .promise(
                        axiosPrivateInstance
                          .post("/api/user", input, {
                            headers: {
                              Authorization: `Bearer ${user.accessToken}`,
                            },
                          })
                          .then((res) => {
                            return res.data;
                          }),
                        {
                          loading: "Menyimpan...",
                          success: () => {
                            return "Berhasil disimpan";
                          },
                          error: () => {
                            return "Gagal disimpan";
                          },
                        },
                      )
                      .then(() => {
                        mutate("/api/user");
                      });
                  }}
                >
                  Simpan
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
