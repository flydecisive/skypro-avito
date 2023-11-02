/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import "./App.css";
import "./globalStyles.module.css";
import AppRoutes from "./routes/routes";
import { useGetAllAdsQuery } from "./services/ads";
import { useDispatch } from "react-redux";
import { setAllAds, setAllImgs } from "./store/actions/creators/ads";
// import { useGetAllImgsQuery } from "./services/ads";
import { AllowedContext } from "./contexts/allowed";
import { AuthUserContext } from "./contexts/authUser";
import { useLazyGetCurrentUserQuery } from "./services/ads";

function App() {
  const dispatch = useDispatch();
  const allAds = useGetAllAdsQuery("?sorting=new").data;
  // const allImgs = useGetAllImgsQuery().data;
  const [isAllowed, setIsAllowed] = useState<boolean>(
    localStorage.getItem("tokenData") ? true : false
  );
  const [authUser, setAuthUser] = useState<{}>();
  const [fetchCurrentUser, { data }] = useLazyGetCurrentUserQuery();

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
    if (isAllowed) {
      fetchCurrentUser();
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
