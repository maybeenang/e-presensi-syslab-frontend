import {
  Button,
  Checkbox,
  Chip,
  Popover,
  PopoverContent,
  PopoverHandler,
  Spinner,
} from "@material-tailwind/react";
import { useHistory } from "../hooks/useHistory";
import { useState } from "react";

export const HistoryPage = () => {
  const headTable = ["No", "Tanggal", "Jam Masuk", "Jam Keluar", "Keterangan"];
  const [month, setMonth] = useState([
    { label: "Januari", value: 0, checked: false },
    { label: "Februari", value: 1, checked: false },
    { label: "Maret", value: 2, checked: false },
    { label: "April", value: 3, checked: false },
    { label: "Mei", value: 4, checked: false },
    { label: "Juni", value: 5, checked: false },
    { label: "Juli", value: 6, checked: false },
    { label: "Agustus", value: 7, checked: false },
    { label: "September", value: 8, checked: false },
    { label: "Oktober", value: 9, checked: false },
    { label: "November", value: 10, checked: false },
    { label: "Desember", value: 11, checked: false },
  ]);

  const handleMonth = (e) => {
    const { checked, value } = e.target;

    setMonth((prev) =>
      prev.map((item) => {
        if (item.value == value) {
          return { ...item, checked: checked };
        }
        return item;
      }),
    );
  };

  const { data, error, isLoading } = useHistory();

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
        <div className="w-full overflow-y-auto p-5">
          <h1 className="border-b-2 text-2xl font-semibold">History</h1>
          <div className="mt-5 w-full">
            <div className="flex flex-wrap items-center gap-3">
              <Popover placement="bottom-start">
                <PopoverHandler>
                  <Button
                    className="rounded-sm px-4 py-2 normal-case shadow-none"
                    color="indigo"
                  >
                    Filter
                  </Button>
                </PopoverHandler>
                <PopoverContent className="rounded-sm">
                  <div className="flex flex-col">
                    {month.map((item, index) => (
                      <Checkbox
                        key={index}
                        label={item.label}
                        value={item.value}
                        onChange={handleMonth}
                        checked={item.checked}
                      />
                    ))}
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          </div>
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
      )}
    </>
  );
};
