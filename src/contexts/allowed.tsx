import React, { useContext } from "react";

interface IllowedContext {
  isAllowed: boolean;
  setIsAllowed?: (params: boolean) => void;
}

export const AllowedContext = React.createContext<IllowedContext>({
  isAllowed: false,
});

export function useAllowedContext() {
  const isAllowed = useContext(AllowedContext);

  return isAllowed;
}
