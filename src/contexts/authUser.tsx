import React, { useContext } from "react";

interface IAuthUserInterface {
  authUser: any;
  setAuthUser?: (params: any) => void;
}

export const AuthUserContext = React.createContext<IAuthUserInterface>({
  authUser: undefined,
});

export function UseAuthUserContext() {
  const authUser = useContext(AuthUserContext);

  return authUser;
}
