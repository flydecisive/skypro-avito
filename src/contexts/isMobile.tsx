import React, { useContext } from "react";

interface IIsMobileContext {
  isMobile: boolean;
}

export const IsMobileContext = React.createContext<IIsMobileContext>({
  isMobile: false,
});

export function useIsMobileContext() {
  const isMobile = useContext(IsMobileContext);

  return isMobile;
}
