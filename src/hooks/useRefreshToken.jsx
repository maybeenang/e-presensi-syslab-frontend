import { axiosInstance } from "../utils/axios";
import { useUser } from "./useUser";

export const useRefreshToken = () => {
  const { setUser } = useUser();

  const refresh = async () => {
    const response = await axiosInstance.get("/api/auth/refresh", {
      withCredentials: true,
    });

    setUser(response.data);

    return response.data?.accessToken;
  };

  return refresh;
};
