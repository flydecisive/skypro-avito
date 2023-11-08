import React, { useContext } from "react";

interface IWindowSizeContext {
  windowSize: { innerWidth: number; innerHeight: number };
}

export const WindowSizeContext = React.createContext<IWindowSizeContext>({
  windowSize: { innerWidth: 1, innerHeight: 1 },
});

export function useWindowSizeContext() {
  const windowSize = useContext(WindowSizeContext);

  return windowSize;
}
