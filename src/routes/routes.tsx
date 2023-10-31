import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "./protected-route";
import MainPage from "../pages/main/main";
import AuthorizationPage from "../pages/authorization/authorization";
import ProfilePage from "../pages/profile/profile";
import AdvPage from "../pages/adv/adv";
import SellerProfilePage from "../pages/seller-profile/seller-profile";

interface AppRoutesProps {
  isAllowed: boolean;
}
function AppRoutes({ isAllowed }: AppRoutesProps) {
  return (
    <Routes>
      <Route
        element={<ProtectedRoute redirectPath="/" isAllowed={isAllowed} />}
      >
        <Route path="/profile" element={<ProfilePage />} />
      </Route>
      <Route path="/seller/:id" element={<SellerProfilePage />} />
      <Route path="/adv/:id" element={<AdvPage />} />
      <Route path="/" element={<MainPage />} />
      <Route path="/login" element={<AuthorizationPage />} />
      <Route path="/register" element={<AuthorizationPage />} />
    </Routes>
  );
}

export default AppRoutes;
