import { Breadcrumbs } from "@material-tailwind/react";
import { CardFitur } from "../components/atoms/CardFitur";
import * as MaterialIcon from "react-icons/md";
import { Link } from "react-router-dom";

export const AdminPage = () => {
  return (
    <div className="w-full overflow-y-auto p-5">
      <h1 className="border-b-2 text-2xl font-semibold">Admin</h1>
      <Breadcrumbs className="px-0">
        <Link to="#">Admin</Link>
      </Breadcrumbs>
      <div className="mt-5 flex w-full flex-wrap items-center gap-3 pb-4">
        <CardFitur
          title="Kelola History"
          icon={<MaterialIcon.MdHistory />}
          color="bg-cyan-700"
          href={"/admin/history"}
        />
        <CardFitur
          title="Kelola Karyawan"
          icon={<MaterialIcon.MdPeople />}
          color="bg-blue-700"
          href={"/admin/user"}
        />
        <CardFitur
          title="Kelola Presensi"
          icon={<MaterialIcon.MdOutlineSettingsApplications />}
          color="bg-light-blue-700"
          href={"/admin/absen"}
        />
      </div>
    </div>
  );
};
