import { axiosInstance } from "../utils/axios";
import useSWR from "swr";

export const useJabatan = () => {
  const fethcer = (url) => axiosInstance.get(url).then((res) => res.data);

  const { data, error, isLoading } = useSWR("/api/public/jabatan", fethcer);

  return { data, error, isLoading };
};
