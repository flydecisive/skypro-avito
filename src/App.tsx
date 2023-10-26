/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import "./App.css";
import "./globalStyles.module.css";
import AppRoutes from "./routes/routes";
import { useGetAllAdsQuery } from "./services/ads";
import { useDispatch } from "react-redux";
import { setAllAds, setAllImgs } from "./store/actions/creators/ads";
import { useGetAllImgsQuery } from "./services/ads";

function App() {
  const dispatch = useDispatch();
  const allAds = useGetAllAdsQuery("?sorting=new").data;
  const allImgs = useGetAllImgsQuery().data;

  useEffect(() => {
    if (allAds) {
      dispatch(setAllAds(allAds));
    }
  }, [allAds]);

  useEffect(() => {
    if (allImgs) {
      dispatch(setAllImgs(allImgs));
    }
  }, [allImgs]);

  return (
    <div className="App">
      <AppRoutes isAllowed={true} />
    </div>
  );
}

export default App;
