import {
  Alert,
  Breadcrumbs,
  Button,
  Card,
  CardBody,
  CardFooter,
  Chip,
  Dialog,
  Spinner,
} from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";
import { useAbsenAdmin } from "../hooks/useAbsenAdmin";
import { useState } from "react";
import Datepicker from "react-tailwindcss-datepicker";
import { useAxiosPrivate } from "../hooks/useAxiosPrivate";
import { useUser } from "../hooks/useUser";
import { useSWRConfig } from "swr";

export const AdminAbsenPage = () => {
  const { data, error, isLoading } = useAbsenAdmin();
  const { mutate } = useSWRConfig();
  const { user } = useUser();
  const navigate = useNavigate();
  const axiosPrivateInstance = useAxiosPrivate();

  const [value, setValue] = useState({
    startDate: new Date(),
    endDate: new Date(),
  });
  const [open, setOpen] = useState(false);

  const [inputData, setInputData] = useState({
    tanggal: "",
    jamMasuk: "",
    jamBatas: "",
    jamKeluar: "",
  });

  const [errInput, setErrInput] = useState({
    open: false,
    value: "",
    color: "red",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setInputData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleOpen = () => {
    setOpen(!open);
  };

  const handleSubmit = async () => {
    if (
      !inputData.jamBatas ||
      !inputData.jamMasuk ||
      !inputData.jamKeluar ||
      !inputData.tanggal
    ) {
      setErrInput((prev) => ({
        ...prev,
        value: "Masukan semua data!",
        open: true,
        color: "red",
      }));
      return;
    }

    if (inputData.jamBatas <= inputData.jamMasuk) {
      setErrInput((prev) => ({
        ...prev,
        value: "Jam batas harus lebih besar dari jam masuk!",
        open: true,
        color: "red",
      }));
      return;
    }

    if (inputData.jamKeluar <= inputData.jamBatas) {
      setErrInput((prev) => ({
        ...prev,
        value: "Jam keluar harus lebih besar dari jam batas!",
        open: true,
        color: "red",
      }));

      return;
    }

    setInputData((prevState) => ({
      ...prevState,
      tanggal: value.startDate,
    }));

    setErrInput((prev) => ({
      ...prev,
      value: "",
    }));

    const bodyRequest = {
      tanggal: inputData.tanggal,
      jamMasuk: inputData.tanggal + " " + inputData.jamMasuk,
      jamBatas: inputData.tanggal + " " + inputData.jamBatas,
      jamKeluar: inputData.tanggal + " " + inputData.jamKeluar,
    };

    try {
      setErrInput((prev) => ({
        ...prev,
        value: "Loading...",
        open: true,
        color: "blue",
      }));
      const res = await axiosPrivateInstance.post(
        `/api/admin/absen`,
        bodyRequest,
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${user?.accessToken}`,
          },
        },
      );

      setErrInput((prev) => ({
        ...prev,
        value: "Berhasil menambahkan data!",
        open: true,
        color: "green",
      }));
    } catch (error) {
      setErrInput((prev) => ({
        ...prev,
        value: error?.response?.data?.error || "Terjadi kesalahan!",
        open: true,
        color: "red",
      }));
    } finally {
      setTimeout(() => {
        setErrInput((prev) => ({
          ...prev,
          value: "",
          open: false,
        }));
        setOpen(false);
        mutate("/api/admin/absen");
      }, 500);
    }
  };

  const handleValueChange = (newValue) => {
    setValue(newValue);
    setInputData((prevState) => ({
      ...prevState,
      tanggal: newValue.startDate,
    }));
  };

  const handleDelete = async (id) => {
    try {
      const res = await axiosPrivateInstance.delete(`/api/admin/absen/${id}`, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${user?.accessToken}`,
        },
      });
      mutate("/api/admin/absen");
    } catch (error) {
      mutate("/api/admin/absen");
    }
  };

  const headTable = [
    "No",
    "Tanggal",
    "Jam Masuk",
    "Jam Batas",
    "Jam Keluar",
    "Action",
  ];

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
        <>
          <div className="w-full overflow-y-auto p-5">
            <h1 className="border-b-2 text-2xl font-semibold">Admin</h1>
            <Breadcrumbs className="px-0">
              <Link to="/admin" className="opacity-60">
                Admin
              </Link>
              <Link href="#">Absen</Link>
            </Breadcrumbs>
            <Button
              onClick={handleOpen}
              color="green"
              className="mt-5 rounded-sm leading-3"
            >
              Tambah Absen
            </Button>

            <table className="mt-2 w-full min-w-full table-auto bg-white text-center">
              <thead className="">
                <tr className="">
                  {headTable.map((item, index) => (
                    <th
                      key={index}
                      className="border-b border-blue-gray-100 bg-indigo-500 px-3 py-2 text-white"
                    >
                      {item}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="">
                {data?.length === 0 && (
                  <tr>
                    <td
                      colSpan={headTable.length}
                      className="border-b border-blue-gray-100 px-3 py-2"
                    >
                      <h1 className="text-xl">Belum ada data absensi</h1>
                    </td>
                  </tr>
                )}

                {data?.map((item, index) => (
                  <tr key={item.id}>
                    <td className="border-b border-blue-gray-100 px-3 py-2">
                      {index + 1}
                    </td>
                    <td className="border-b border-blue-gray-100 px-3 py-2">
                      {new Date(item.tanggal).toLocaleDateString("id-ID", {
                        dateStyle: "full",
                      })}
                    </td>
                    <td className="border-b border-blue-gray-100 px-3 py-2">
                      {new Date(item.jamMasuk).toLocaleTimeString("id-ID", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </td>
                    <td className="border-b border-blue-gray-100 px-3 py-2">
                      {new Date(item.jamBatas).toLocaleTimeString("id-ID", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </td>
                    <td className="border-b  border-blue-gray-100 px-3 py-2">
                      {new Date(item.jamKeluar).toLocaleTimeString("id-ID", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </td>
                    <td className="border-b  border-blue-gray-100 px-3 py-2">
                      <div className="mx-auto flex w-fit items-center justify-center gap-1">
                        <Chip
                          variant="ghost"
                          color="cyan"
                          size="sm"
                          value="Detail"
                          className="cursor-pointer"
                          onClick={() => {
                            navigate(`/admin/absen/${item.id}`);
                          }}
                        />
                        <Chip
                          variant="ghost"
                          color="red"
                          size="sm"
                          value="Delete"
                          className="cursor-pointer"
                          onClick={() => handleDelete(item.id)}
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Dialog
            open={open}
            handler={handleOpen}
            className="h-screen bg-transparent shadow-none"
          >
            <Card className="mx-auto w-full max-w-[24rem] rounded-sm">
              <CardBody className="flex flex-col gap-4 ">
                <h1 className="text-lg font-semibold">Tambah Absen</h1>
                <Alert
                  variant="gradient"
                  color={errInput.color}
                  open={errInput.open}
                  action={
                    <Button
                      variant="text"
                      color="white"
                      size="sm"
                      className="!absolute right-3 top-3"
                      onClick={() =>
                        setErrInput((prev) => ({ ...prev, open: false }))
                      }
                    >
                      Close
                    </Button>
                  }
                >
                  {errInput?.value}
                </Alert>
                <div className="">
                  <div className="">
                    <label htmlFor="tanggal" className="text-sm">
                      Tanggal
                    </label>

                    <Datepicker
                      value={value}
                      onChange={handleValueChange}
                      asSingle={true}
                      useRange={false}
                      inputClassName={
                        "w-full border border-blue-gray-200 rounded-sm px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
                      }
                      minDate={new Date()}
                    />
                  </div>
                  <div className="mt-2">
                    <label htmlFor="tanggal" className="text-sm">
                      Jam Masuk
                    </label>
                    <input
                      type="time"
                      name="jamMasuk"
                      id="jamMasuk"
                      value={inputData.jamMasuk}
                      onChange={handleInputChange}
                      className="w-full rounded-sm border border-blue-gray-200 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
                    />
                  </div>
                  <div className="mt-2">
                    <label htmlFor="jamBatas" className="text-sm">
                      Jam Batas
                    </label>
                    <input
                      type="time"
                      name="jamBatas"
                      id="jamBatas"
                      value={inputData.jamBatas}
                      onChange={handleInputChange}
                      className="w-full rounded-sm border border-blue-gray-200 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
                    />
                  </div>
                  <div className="mt-2">
                    <label htmlFor="jamKeluar" className="text-sm">
                      Jam Keluar
                    </label>
                    <input
                      type="time"
                      name="jamKeluar"
                      id="jamKeluar"
                      value={inputData.jamKeluar}
                      onChange={handleInputChange}
                      className="w-full rounded-sm border border-blue-gray-200 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
                    />
                  </div>
                </div>
              </CardBody>
              <CardFooter className="flex justify-end gap-2">
                <Button
                  variant="text"
                  color="red"
                  onClick={handleOpen}
                  className="rounded-sm"
                >
                  <span>Cancel</span>
                </Button>
                <Button
                  color="green"
                  onClick={handleSubmit}
                  className="rounded-sm"
                >
                  <span>Confirm</span>
                </Button>
              </CardFooter>
            </Card>
          </Dialog>
        </>
      )}
    </>
  );
};
