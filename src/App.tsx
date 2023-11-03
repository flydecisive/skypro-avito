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

  useEffect(() => {
    if (data) {
      setAuthUser(data);
    }
  }, [data]);

  useEffect(() => {
    if (allAds) {
      console.log(allAds);
      dispatch(setAllAds(allAds));
    }
  }, [allAds]);

  useEffect(() => {
    if (isAllowed) {
      fetchCurrentUser();
      const intervalId = setInterval(updateTokensTrigger, 10000);
      setIntervalId(intervalId);
    }
    if (!isAllowed && intervalId) {
      clearInterval(intervalId);
    }
  }, [isAllowed]);

  return (
    <div className="App">
      <AllowedContext.Provider value={{ isAllowed, setIsAllowed }}>
        <AuthUserContext.Provider value={{ authUser, setAuthUser }}>
          <AppRoutes isAllowed={isAllowed} />
        </AuthUserContext.Provider>
      </AllowedContext.Provider>
    </div>
  );
}

export default App;
