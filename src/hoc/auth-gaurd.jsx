import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { Loader } from "lucide-react";
import ProgressBar from "@/common/progress-bar";

export const ProtectedRouteMiddleware = () => {
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      let token = localStorage.getItem("token");

      setAuthorized(!!token);
      setLoading(false);
    };

    checkAuth();
  }, []);

  if (loading)
    return (
      <div className="h-screen flex justify-center items-center ">
        <Loader className="animate-pulse" />
      </div>
    ); // show loader while checking
  if (!authorized) return <Navigate to={"/"} replace />;

  return (
    <ProgressBar>
      <Outlet />
    </ProgressBar>
  );
};
export const PublicRouteMiddleware = () => {
  const token = localStorage.getItem("token");
  const isLoggedIn = localStorage.getItem("isLoggedIn");

  if (token && isLoggedIn) {
    return <Navigate to={"/dashboard"} replace />;
  }
  return <Outlet />;
};
