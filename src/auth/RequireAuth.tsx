import { useLocation, Navigate } from "react-router-dom";

import { useAuth } from "./AuthContext.tsx";
import Layouts from "../components/layouts/Layouts.tsx";


export default function RequireAuth (){
  const { invalidToken } = useAuth();
  const location = useLocation();
  if (invalidToken) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Layouts/>
};

