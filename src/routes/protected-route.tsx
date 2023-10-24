import { Navigate, Outlet } from "react-router-dom";

interface ProtectedRouteProps {
  redirectPath: string;
  isAllowed: boolean;
}

function ProtectedRoute({
  redirectPath = "/",
  isAllowed,
}: ProtectedRouteProps) {
  if (!isAllowed) {
    return <Navigate to={redirectPath} replace />;
  }

  return <Outlet />;
}

export default ProtectedRoute;
