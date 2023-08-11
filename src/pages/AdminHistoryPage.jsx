import { Breadcrumbs, Button, Chip, Spinner } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import { useHistoryAdmin } from "../hooks/useHistoryAdmin";

export const AdminHistoryPage = () => {
  const { data, error, isLoading } = useHistoryAdmin();

  const headTable = [
    "No",
    "NIP",
    "Tanggal",
    "Jam Masuk",
    "Jam Keluar",
    "Keterangan",
  ];

  if (error) {
    return (
      <>
        <div className="grid h-screen w-full place-items-center">
          <div className="text-center">
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
        <div className="w-full overflow-y-auto p-5">
          <h1 className="border-b-2 text-2xl font-semibold">Admin</h1>
          <Breadcrumbs className="px-0">
            <Link to="/admin" className="opacity-60">
              Admin
            </Link>
            <Link href="#">History</Link>
          </Breadcrumbs>
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
              {data?.length === 0 && (
                <tr>
                  <td
                    colSpan={headTable.length}
                    className="border-b border-blue-gray-100 px-3 py-2"
                  >
                    <h1 className="text-xl">Belum ada data presensi</h1>
                  </td>
                </tr>
              )}

              {data?.map((item, index) => (
                <tr key={item.id}>
                  <td className="border-b border-blue-gray-100 px-3 py-2">
                    {index + 1}
                  </td>
                  <td className="border-b border-blue-gray-100 px-3 py-2">
                    {item.nipHistory}
                  </td>
                  <td className="border-b border-blue-gray-100 px-3 py-2">
                    {new Date(item.jamMasuk).toLocaleDateString("id-ID", {
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
                    {" "}
                    {new Date(item.jamKeluar).toLocaleTimeString("id-ID", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </td>
                  <td className="border-b border-blue-gray-100  px-3 py-2">
                    <Chip
                      variant="ghost"
                      color={
                        item.statusId === 1
                          ? "green"
                          : item.statusId === 2
                          ? "amber"
                          : item.statusId === 3
                          ? "red"
                          : "blue"
                      }
                      size="sm"
                      value={
                        item.statusId === 1
                          ? "Hadir"
                          : item.statusId === 2
                          ? "Terlambat"
                          : item.statusId === 3
                          ? "Tidak Hadir"
                          : "Izin"
                      }
                      className="mx-auto w-28"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};
