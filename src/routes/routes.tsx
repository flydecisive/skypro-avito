import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "./protected-route";
import Main from "../pages/main/main";

function AppRoutes({ isAllowed }: { isAllowed: boolean }) {
  return (
    <Routes>
      <Route
        element={<ProtectedRoute redirectPath="/" isAllowed={isAllowed} />}
      >
        <Route path="/" element={<Main />} />
      </Route>
      <Route path="/" element={<Main />} />
    </Routes>
  );
}

export default AppRoutes;
