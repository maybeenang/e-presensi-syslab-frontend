import { Breadcrumbs, Button, Chip, Spinner } from "@material-tailwind/react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useAbsenDetailAdmin } from "../hooks/useAbsenDetailAdmin";
import { useEffect, useState } from "react";

export const AdminAbsenDetail = () => {
  const navigate = useNavigate();

  const param = useParams();
  const { id } = param;

  const { data, isLoading, error } = useAbsenDetailAdmin({ params: id });

  const [user, setUser] = useState();

  const headTable = ["No", "NIP", "Nama Lengkap", "Jam Masuk", "Action"];

  useEffect(() => {
    setUser(data?.user);
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
            <Link to="/admin/absen" className="opacity-60">
              Absen
            </Link>
            <Link to="#">Detail</Link>
          </Breadcrumbs>
          <h1 className="mt-5 text-4xl font-semibold">Detail</h1>
          <div className="flex flex-col gap-5">
            <table className="mt-5 w-full min-w-full table-auto bg-white text-center">
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
                {user?.length === 0 && (
                  <tr>
                    <td
                      colSpan={headTable.length}
                      className="border-b border-blue-gray-100 px-3 py-2"
                    >
                      <h1 className="text-xl">Belum ada data absensi</h1>
                    </td>
                  </tr>
                )}

                {user?.map((item, index) => (
                  <tr key={item.id}>
                    <td className="border-b border-blue-gray-100 px-3 py-2">
                      {index + 1}
                    </td>
                    <td className="border-b border-blue-gray-100 px-3 py-2">
                      {item.nip}
                    </td>
                    <td className="border-b border-blue-gray-100 px-3 py-2">
                      {item.nama}
                    </td>
                    <td className="border-b border-blue-gray-100 px-3 py-2">
                      {new Date(item.history?.jamMasuk).toLocaleTimeString(
                        "id-ID",
                        {
                          hour: "2-digit",
                          minute: "2-digit",
                        },
                      )}
                    </td>

                    <td className="border-b  border-blue-gray-100 px-3 py-2">
                      <div className="mx-auto flex w-fit items-center justify-center gap-1">
                        <Chip
                          variant="ghost"
                          color={
                            item.history?.statusId === 1
                              ? "green"
                              : item.history?.statusId === 2
                              ? "amber"
                              : item.history?.statusId === 3
                              ? "red"
                              : "blue"
                          }
                          size="sm"
                          value={
                            item.history?.statusId === 1
                              ? "Hadir"
                              : item.history?.statusId === 2
                              ? "Terlambat"
                              : item.history?.statusId === 3
                              ? "Tidak Hadir"
                              : "Izin"
                          }
                          className="mx-auto w-28"
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
};
