import React, { createContext, useContext } from "react";
import { IUser } from "./domain/auth/types";

export interface IAuthProps {
  isTokenLoading: boolean;
  isLoggedIn: boolean;
  accessToken: string;
  refreshToken: string;
  user: IUser;
}

export interface IAuthContext {
  authState: IAuthProps;
  setAuthState: React.Dispatch<React.SetStateAction<IAuthProps>>;
}

export const DEFAULT_AUTH_VALUES = {
  authState: {
    isLoggedIn: false,
    isTokenLoading: false,
    accessToken: undefined,
    refreshToken: undefined,
    user: undefined,
  },
  setAuthState: () => {},
};

export const AuthContext = createContext<IAuthContext>(DEFAULT_AUTH_VALUES);

export const useAuthContext = () => useContext(AuthContext);
