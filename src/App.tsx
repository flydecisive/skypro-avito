/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import "./App.css";
import "./globalStyles.module.css";
import AppRoutes from "./routes/routes";
import { useGetAllAdsQuery } from "./services/ads";
import { useDispatch } from "react-redux";
import { setAllAds } from "./store/actions/creators/ads";

function App() {
  const dispatch = useDispatch();
  const allAds = useGetAllAdsQuery("?sorting=new").data;
  useEffect(() => {
    if (allAds) {
      dispatch(setAllAds(allAds));
    }
  }, [allAds]);

  return (
    <div className="App">
      <AppRoutes isAllowed={true} />
    </div>
  );
}

export default App;
