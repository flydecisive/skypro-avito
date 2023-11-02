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
import { getAllUsers } from "./api";
import { UserEmailContext } from "./contexts/userEmail";
import { AuthUserContext } from "./contexts/authUser";
import { useGetCurrentUserQuery } from "./services/ads";

function App() {
  const dispatch = useDispatch();
  const allAds = useGetAllAdsQuery("?sorting=new").data;
  // const allImgs = useGetAllImgsQuery().data;
  const [isAllowed, setIsAllowed] = useState<boolean>(
    localStorage.getItem("refresh") ? true : false
  );
  const [userEmail, setUserEmail] = useState<string | null>(
    localStorage.getItem("email")
  );
  const [authUser, setAuthUser] = useState();
  const currentUser = useGetCurrentUserQuery().data;
  console.log(currentUser);

  const getAndSetUser = async () => {
    const users = await getAllUsers();

    // const currentUser = await getCurrentUser();

    for (let i = 0; i < users.length; i++) {
      if (users[i].email === userEmail) {
        setAuthUser(users[i]);
        break;
      }
    }
  };

  useEffect(() => {
    if (allAds) {
      dispatch(setAllAds(allAds));
    }
  }, [allAds]);

  // useEffect(() => {
  //   if (allImgs) {
  //     dispatch(setAllImgs(allImgs));
  //   }
  // }, [allImgs]);

  useEffect(() => {
    if (isAllowed) {
      getAndSetUser();
    }
  }, [isAllowed]);

  return (
    <div className="App">
      <AllowedContext.Provider value={{ isAllowed, setIsAllowed }}>
        <UserEmailContext.Provider value={{ userEmail, setUserEmail }}>
          <AuthUserContext.Provider value={{ authUser, setAuthUser }}>
            <AppRoutes isAllowed={isAllowed} />
          </AuthUserContext.Provider>
        </UserEmailContext.Provider>
      </AllowedContext.Provider>
    </div>
  );
}

export default App;
