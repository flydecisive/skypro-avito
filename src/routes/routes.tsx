import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "./protected-route";
import Main from "../pages/main/main";
import AuthorizationPage from "../pages/authorization/authorization";

interface AppRoutesProps {
  isAllowed: boolean;
}
function AppRoutes({ isAllowed }: AppRoutesProps) {
  return (
    <Routes>
      <Route
        element={<ProtectedRoute redirectPath="/" isAllowed={isAllowed} />}
      >
        <Route path="/" element={<Main />} />
      </Route>
      <Route path="/" element={<Main />} />
      <Route path="/login" element={<AuthorizationPage />} />
      <Route path="/register" element={<AuthorizationPage />} />
    </Routes>
  );
}

export default AppRoutes;
