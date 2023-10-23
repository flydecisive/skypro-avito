import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "./protected-route";
import MainPage from "../pages/main/main";
import AuthorizationPage from "../pages/authorization/authorization";
import ProfilePage from "../pages/profile/profile";
import AdvPage from "../pages/product/adv";

interface AppRoutesProps {
  isAllowed: boolean;
}
function AppRoutes({ isAllowed }: AppRoutesProps) {
  return (
    <Routes>
      <Route
        element={<ProtectedRoute redirectPath="/" isAllowed={isAllowed} />}
      >
        <Route path="/" element={<MainPage />} />
      </Route>
      <Route path="/" element={<MainPage />} />
      <Route path="/login" element={<AuthorizationPage />} />
      <Route path="/register" element={<AuthorizationPage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/adv" element={<AdvPage />} />
    </Routes>
  );
}

export default AppRoutes;
