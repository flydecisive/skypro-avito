import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "./protected-route";
import MainPage from "../pages/main/main";
import AuthorizationPage from "../pages/authorization/authorization";
import UserPage from "../pages/user/user";

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
      <Route path="/user" element={<UserPage />} />
    </Routes>
  );
}

export default AppRoutes;
