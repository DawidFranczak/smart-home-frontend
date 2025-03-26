import { useLocation, Navigate, Outlet } from "react-router-dom";

import { useAuth } from "./context/AuthContext";

import BackgroundChanger from "./components/BackgroundChanger/BackgroundChanger";
import Navbar from "./components/Navbar/Navbar";
import Logo from "./components/Logo/Logo";
import CacheUpdater from "./components/CacheUpdater";
import { useQueryClient } from "@tanstack/react-query";

const RequireAuth = () => {
  const { invalidToken } = useAuth();
  const location = useLocation();
  const queryClient = useQueryClient();
  if (invalidToken) {
    queryClient.clear();
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return (
    <>
      <CacheUpdater />
      <BackgroundChanger />
      <Logo />
      <Navbar />
      <Outlet />
    </>
  );
};

export default RequireAuth;
