import useSWR from "swr";
import { useUser } from "./useUser";
import { useAxiosPrivate } from "./useAxiosPrivate";

export const useAbsen = () => {
  const { user } = useUser();
  const axiosPrivateInstance = useAxiosPrivate();

  const fethcer = (url) =>
    axiosPrivateInstance
      .get(url, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${user?.accessToken}`,
        },
      })
      .then((res) => res.data);

  const { data, error, isLoading } = useSWR("/api/user/absen", fethcer);

  return { data, error, isLoading };
};
