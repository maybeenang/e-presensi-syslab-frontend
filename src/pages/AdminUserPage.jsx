import { Breadcrumbs, Button, Chip, Spinner } from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";
import { useUserAdmin } from "../hooks/userUserAdmin";

export const AdminUserPage = () => {
  const navigate = useNavigate();
  const { data, error, isLoading } = useUserAdmin();

  const headTable = ["No", "NIP", "Nama Lengkap", "Jabatan", "Role", "Action"];

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
            <Link href="#">User</Link>
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
                    {item.nip}
                  </td>
                  <td className="border-b border-blue-gray-100 px-3 py-2">
                    {item.nama}
                  </td>
                  <td className="border-b border-blue-gray-100 px-3 py-2">
                    {item.jabatan?.jabatan ? item.jabatan?.jabatan : "-"}
                  </td>
                  <td className="border-b  border-blue-gray-100 px-3 py-2">
                    <div className="flex items-center justify-center gap-1">
                      {item.roles.map((item, index) => (
                        <Chip
                          key={index}
                          variant="ghost"
                          color={item.role === "Admin" ? "red" : "green"}
                          size="sm"
                          value={item.role}
                        />
                      ))}
                    </div>
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
                          navigate(`/admin/user/${item.id}`);
                        }}
                      />
                    </div>
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
