/* eslint-disable react/prop-types */
import {
  Card,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import { toast } from "react-hot-toast";
import { useUser } from "../../hooks/useUser";
import { useSWRConfig } from "swr";
import { useAxiosPrivate } from "../../hooks/useAxiosPrivate";

export const CardAbsen = ({ data }) => {
  const { user } = useUser();

  const { mutate } = useSWRConfig();

  const day = new Date(data?.tanggal).toLocaleDateString("id-ID", {
    weekday: "long",
  });
  const tanggal = new Date(data?.tanggal).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const jamMasuk = new Date(data?.jamMasuk).toLocaleTimeString("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
  });

  const jamKeluar = new Date(data?.jamKeluar).toLocaleTimeString("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
  });

  const axiosPrivateInstance = useAxiosPrivate();

  const handleIzin = async () => {
    try {
      toast.promise(
        axiosPrivateInstance.get(`/api/user/absen-izin/${data?.id}`, {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${user?.accessToken}`,
          },
        }),
        {
          loading: "Loading",
          success: (res) => {
            toast.remove();
            mutate("/api/user/absen", async () => {
              const res = await axiosPrivateInstance.get("/api/user/absen", {
                withCredentials: true,
                headers: {
                  Authorization: `Bearer ${user?.accessToken}`,
                },
              });
              return res.data;
            });
            mutate("/api/user/history", async () => {
              const res = await axiosPrivateInstance.get("/api/user/history", {
                withCredentials: true,
                headers: {
                  Authorization: `Bearer ${user?.accessToken}`,
                },
              });
              return res.data;
            });
            return res.data.message;
          },
          error: (err) => {
            if (!err?.response) {
              return "Something went wrong";
            }
            toast.remove();
            return err.response.data.error;
          },
        },
      );
    } catch (err) {
      toast.remove();
      toast.error(err);
    }
  };

  const handleAbsen = async () => {
    try {
      toast.promise(
        axiosPrivateInstance.get(`/api/user/absen-masuk/${data?.id}`, {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${user?.accessToken}`,
          },
        }),
        {
          loading: "Loading",
          success: (res) => {
            toast.remove();
            mutate("/api/user/absen", async () => {
              const res = await axiosPrivateInstance.get("/api/user/absen", {
                withCredentials: true,
                headers: {
                  Authorization: `Bearer ${user?.accessToken}`,
                },
              });
              return res.data;
            });
            mutate("/api/user/history", async () => {
              const res = await axiosPrivateInstance.get("/api/user/history", {
                withCredentials: true,
                headers: {
                  Authorization: `Bearer ${user?.accessToken}`,
                },
              });
              return res.data;
            });
            return res.data.message;
          },
          error: (err) => {
            if (!err?.response) {
              return "Something went wrong";
            }
            toast.remove();
            return err.response.data.error;
          },
        },
      );
    } catch (err) {
      toast.remove();
      toast.error(err);
    }
  };

  return (
    <Card
      className={`shadow-amber-200" flex w-64 flex-row items-center justify-between rounded-sm bg-amber-400`}
    >
      <CardBody className="">
        <Typography variant="h5" color="black" className="">
          {day}
        </Typography>
        <Typography color="black" className="text-sm">
          {tanggal}
        </Typography>
        <Typography color="black" className="text-sm">
          {jamMasuk} - {jamKeluar}
        </Typography>
      </CardBody>
      <CardFooter className="flex flex-col gap-1 p-5 ">
        <Button
          className="rounded-md px-5 py-2 shadow-none"
          onClick={() => {
            handleAbsen();
          }}
        >
          Masuk
        </Button>
        <Button
          className=" rounded-md px-5 py-2 shadow-none"
          color="red"
          onClick={() => handleIzin()}
        >
          Izin
        </Button>
      </CardFooter>
    </Card>
  );
};
