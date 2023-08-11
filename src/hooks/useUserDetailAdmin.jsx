import { useAxiosPrivate } from "./useAxiosPrivate";
import useSWR from "swr";
import { useUser } from "./useUser";

export const useUserDetailAdmin = ({ params }) => {
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

  const { data, error, isLoading } = useSWR(
    `/api/admin/user/${params}`,
    fethcer,
  );

  return { data, error, isLoading };
};
