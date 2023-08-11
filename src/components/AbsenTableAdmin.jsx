/* eslint-disable react/prop-types */
// eslint-disable-next-line react/prop-types
export const AbsenTableAdmin = ({ data }) => {
  const headTable = ["No", "Tanggal", "Jam Masuk", "Jam Batas", "Jam Keluar"];

  return (
    <>
      <h1 className="mt-5 text-4xl font-semibold">Presensi</h1>
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
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};
