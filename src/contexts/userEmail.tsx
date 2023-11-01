import React, { useContext } from "react";

interface IUserEmailInterface {
  userEmail: string;
  setUserEmail?: (params: string) => void;
}

export const UserEmailContext = React.createContext<IUserEmailInterface>({
  userEmail: "",
});

export function UseUserEmailContext() {
  const userEmail = useContext(UserEmailContext);

  return userEmail;
}
