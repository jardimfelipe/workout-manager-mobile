import { useMutation } from "@tanstack/react-query";
import axios from "axios";

import { useAuthContext } from "../../context";
import { removeValue } from "../../utils/secureStore";

const useLogout = () => {
  const { authState, setAuthState } = useAuthContext();
  return useMutation(
    () =>
      axios.post(
        "https://1c3e-2804-1b3-a643-9b2e-d3b4-9235-54c6-f13.sa.ngrok.io/auth/logout",
        { id: authState.user._id }
      ),
    {
      onSuccess: async () => {
        await removeValue("accessToken");
        await removeValue("refreshToken");
        setAuthState({
          isLoggedIn: false,
          isTokenLoading: false,
          accessToken: undefined,
          refreshToken: undefined,
          user: undefined,
        });
      },
    }
  );
};

export default useLogout;
