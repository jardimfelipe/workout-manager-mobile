import { useMutation } from "@tanstack/react-query";
import axios from "axios";

import { useAuthContext } from "../../context";
import { removeValue } from "../../utils/secureStore";

const useLogout = () => {
  const { authState, setAuthState } = useAuthContext();
  return useMutation(
    () =>
      axios.post("https://workout-manager.herokuapp.com/auth/logout", {
        id: authState.user._id,
      }),
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
