import axios, { AxiosRequestConfig } from "axios";

import { useAuthContext } from "../context";
import useLogout from "../domain/auth/useLogout";
import { saveInStore } from "../utils/secureStore";

const useApi = () => {
  const logout = useLogout();
  const { authState, setAuthState } = useAuthContext();
  const api = axios.create({
    baseURL: "https://1c3e-2804-1b3-a643-9b2e-d3b4-9235-54c6-f13.sa.ngrok.io",
  });

  const validateToken = async (refreshToken: string) => {
    try {
      const { data } = await api.post("/auth/refresh", {
        refreshToken,
        id: authState.user?._id,
      });

      await saveInStore("accessToken", data.accessToken);
      await saveInStore("refreshToken", data.refreshToken);

      setAuthState({
        ...authState,
        accessToken: data.accessToken,
        refreshToken: data.refreshToken,
      });

      return data.accessToken;
    } catch (error) {
      logout.mutate();
      return Promise.reject(error);
    }
  };

  api.interceptors.request.use((config: AxiosRequestConfig<any>) => {
    if (authState.isLoggedIn) {
      config.headers.Authorization = `Bearer ${authState.accessToken}`;
    }
    return config;
  });

  api.interceptors.response.use(
    (response) => {
      return response;
    },
    async function (error) {
      const {
        config,
        response: { status },
      } = error;
      const { accessToken, refreshToken } = authState;
      if (status === 401 && accessToken) {
        try {
          const newAccessToken = await validateToken(refreshToken);
          return await axios({
            ...config,
            headers: { Authorization: `Bearer ${newAccessToken}` },
          });
        } catch (error) {
          return Promise.reject(error);
        }
      }

      return Promise.reject(error);
    }
  );
  return api;
};

export default useApi;
