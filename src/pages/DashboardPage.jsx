import {
  Avatar,
  Button,
  Card,
  CardBody,
  CardFooter,
  Spinner,
  Typography,
} from "@material-tailwind/react";
import userImg from "../assets/img/userProfile.jpg";
// import { bg } from "../assets/img/bg.png";
import { CardAbsen } from "../components/atoms/CardAbsen";
import { useUser } from "../hooks/useUser";
import { useAbsen } from "../hooks/useAbsen";
import { useHistory } from "../hooks/useHistory";
import { useEffect, useState } from "react";
import { useUserProfile } from "../hooks/useUserProfile";

export const DashboardPage = () => {
  const { user } = useUser();
  const { data, error, isLoading } = useAbsen();
  const { data: dataUser } = useUserProfile();
  const {
    data: dataHistory,
    error: errorHistory,
    isLoading: isLoadingHistory,
  } = useHistory();

  const [history, setHistory] = useState({
    hadir: 0,
    izin: 0,
    terlambat: 0,
    tidakHadir: 0,
  });

  useEffect(() => {
    setHistory({
      hadir: dataHistory?.filter((absen) => absen.statusId === 1).length,
      izin: dataHistory?.filter((absen) => absen.statusId === 4).length,
      terlambat: dataHistory?.filter((absen) => absen.statusId === 2).length,
      tidakHadir: dataHistory?.filter((absen) => absen.statusId === 3).length,
    });
  }, [dataHistory]);

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
          <h1 className="border-b-2 text-6xl font-semibold">Dashboard</h1>
          <dir className="flex w-full items-center gap-5 px-0 py-5">
            <Avatar
              src={dataUser?.profile_url ? dataUser?.profile_url : userImg}
              alt="User Profile"
              size="xxl"
              className="h-20 w-20 ring-2 ring-black sm:h-40 sm:w-40"
            />
            <div className="w-full">
              <p className="font-sans text-base font-semibold sm:text-4xl">
                Selamat {new Date().getHours() < 12 ? "Pagi" : "Siang"}!
              </p>
              <p className="font-sans text-sm sm:text-2xl">
                {user?.nama.charAt(0).toUpperCase() + user?.nama.slice(1)}
              </p>
              <p className="font-sans text-sm italic sm:text-xl">
                {user?.roles.map((role, index) => {
                  return `${role.role} ${
                    index === user.roles.length - 1 ? "" : "| "
                  }`;
                })}
              </p>
            </div>
          </dir>
          <div className="flex w-full flex-wrap items-center gap-3 border-b-2 pb-4">
            {data?.length > 0 ? (
              data.map((absen, index) => {
                return <CardAbsen key={index} data={absen} />;
              })
            ) : (
              <p className="mx-auto text-center">Belum ada data presensi</p>
            )}
          </div>
          <div className="mt-5 flex w-full flex-wrap items-center gap-3 pb-4">
            {isLoadingHistory ? (
              <div className="grid h-screen w-full place-items-center">
                <Spinner className="h-16 w-16 text-blue-500/10" />
              </div>
            ) : errorHistory ? (
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
            ) : (
              <>
                <Card
                  className={`flex w-64 flex-col justify-between rounded-sm bg-green-600 text-white shadow-green-200`}
                >
                  <CardBody className="flex-2">
                    <Typography className="text-7xl ">
                      {history?.hadir ? history?.hadir : 0}
                    </Typography>
                  </CardBody>
                  <CardFooter className="flex flex-col items-start justify-center gap-1 ">
                    <Typography className="mx-auto text-2xl">Hadir</Typography>
                  </CardFooter>
                </Card>
                <Card
                  className={`flex w-64 flex-col justify-between rounded-sm bg-orange-600 text-white shadow-orange-200`}
                >
                  <CardBody className="flex-2">
                    <Typography className="text-7xl ">
                      {history?.terlambat ? history?.terlambat : 0}
                    </Typography>
                  </CardBody>
                  <CardFooter className="flex flex-col items-start justify-center gap-1 ">
                    <Typography className="mx-auto text-2xl">
                      Terlambat
                    </Typography>
                  </CardFooter>
                </Card>
                <Card
                  className={`flex w-64 flex-col justify-between rounded-sm bg-blue-600 text-white shadow-blue-200`}
                >
                  <CardBody className="flex-2">
                    <Typography className="text-7xl ">
                      {history?.izin ? history?.izin : 0}
                    </Typography>
                  </CardBody>
                  <CardFooter className="flex flex-col items-start justify-center gap-1 ">
                    <Typography className="mx-auto text-2xl">Izin</Typography>
                  </CardFooter>
                </Card>
                <Card
                  className={`flex w-64 flex-col justify-between rounded-sm bg-red-500 text-white shadow-red-200`}
                >
                  <CardBody className="flex-2">
                    <Typography className="text-7xl ">
                      {history?.tidakHadir ? history?.tidakHadir : 0}
                    </Typography>
                  </CardBody>
                  <CardFooter className="flex flex-col items-start justify-center gap-1 ">
                    <Typography className="mx-auto text-2xl">
                      Tidak Hadir
                    </Typography>
                  </CardFooter>
                </Card>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};
