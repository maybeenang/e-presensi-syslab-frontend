/* eslint-disable react/prop-types */
import { Chip } from "@material-tailwind/react";

// eslint-disable-next-line react/prop-types
export const HistoryTableAdmin = ({ data }) => {
  const headTable = ["No", "Tanggal", "Jam Masuk", "Jam Keluar", "Keterangan"];

  return (
    <>
      <div className="mt-7">
        <h1 className=" text-2xl font-semibold">History</h1>
        <div className="max-h-96 overflow-auto">
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
                    <h1 className="text-xl">Belum ada data history</h1>
                  </td>
                </tr>
              )}
              {data?.map((item, index) => (
                <tr key={item.id}>
                  <td className="border-b border-blue-gray-100 px-3 py-2">
                    {index + 1}
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
      </div>
    </>
  );
};
