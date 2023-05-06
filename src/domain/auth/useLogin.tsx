import { useMutation } from "@tanstack/react-query";
import jwtDecode from "jwt-decode";

import { useAuthContext } from "../../context";
import useApi from "../../service/api";
import { saveInStore } from "../../utils";
import { IUser, LoginPayload } from "./types";

const useLogin = () => {
  const api = useApi();
  const { setAuthState } = useAuthContext();
  return useMutation(
    (params: LoginPayload) => api.post("/auth/signin", params),
    {
      onSuccess: async (response) => {
        const { accessToken, refreshToken } = response.data;
        const user: IUser = jwtDecode(accessToken);
        await saveInStore("accessToken", accessToken);
        await saveInStore("refreshToken", refreshToken);

        setAuthState({
          isLoggedIn: true,
          isTokenLoading: false,
          accessToken,
          refreshToken,
          user,
        });
      },
    }
  );
};

export default useLogin;
