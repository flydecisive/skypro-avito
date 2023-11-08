/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import "./App.css";
import "./globalStyles.module.css";
import AppRoutes from "./routes/routes";
import {
  useGetAllAdsQuery,
  useLazyGetCurrentUserQuery,
  useUpdateTokensMutation,
} from "./services/ads";
import { useDispatch } from "react-redux";
import { setAllAds } from "./store/actions/creators/ads";
import { AllowedContext } from "./contexts/allowed";
import { AuthUserContext } from "./contexts/authUser";
import { WindowSizeContext } from "./contexts/window-size";

function App() {
  const dispatch = useDispatch();
  const allAds = useGetAllAdsQuery("?sorting=new").data;
  const [isAllowed, setIsAllowed] = useState<boolean>(
    localStorage.getItem("tokenData") ? true : false
  );
  const [authUser, setAuthUser] = useState<{}>();
  const [fetchCurrentUser, { data }] = useLazyGetCurrentUserQuery();
  const [updateTokensTrigger] = useUpdateTokensMutation();
  const [intervalId, setIntervalId] = useState<any>();
  const [windowSize, setWindowSize] = useState(getWindowSize());

  useEffect(() => {
    function handleWindowResize() {
      setWindowSize(getWindowSize());
    }

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  function getWindowSize() {
    const { innerWidth, innerHeight } = window;
    return { innerWidth, innerHeight };
  }

  useEffect(() => {
    if (data) {
      setAuthUser(data);
    }
  }, [data]);

  useEffect(() => {
    if (allAds) {
      dispatch(setAllAds(allAds));
    }
  }, [allAds]);

  useEffect(() => {
    const storageIntervalId = parseInt(
      localStorage.getItem("intervalId") || ""
    );

    if (isAllowed && !storageIntervalId) {
      fetchCurrentUser();
      let intervalId = setInterval(updateTokensTrigger, 240000);
      localStorage.setItem("intervalId", JSON.stringify(intervalId));
      setIntervalId(intervalId);
    }
    if (!isAllowed && intervalId) {
      clearInterval(intervalId);
      setIntervalId(undefined);
    }
  }, [isAllowed]);

  const toggleBeforeunload = () => {
    const storageIntervalId = parseInt(
      localStorage.getItem("intervalId") || ""
    );

    if (storageIntervalId) {
      clearInterval(storageIntervalId);
      localStorage.removeItem("intervalId");
    }
  };

  useEffect(() => {
    if (intervalId) {
      window.addEventListener("beforeunload", toggleBeforeunload);
      return () => {
        window.removeEventListener("beforeunload", toggleBeforeunload);
      };
    }
  }, [intervalId]);

  return (
    <div className="App">
      <AllowedContext.Provider value={{ isAllowed, setIsAllowed }}>
        <AuthUserContext.Provider value={{ authUser, setAuthUser }}>
          <WindowSizeContext.Provider value={{ windowSize }}>
            <AppRoutes isAllowed={isAllowed} />
          </WindowSizeContext.Provider>
        </AuthUserContext.Provider>
      </AllowedContext.Provider>
    </div>
  );
}

export default App;
