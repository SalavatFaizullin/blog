import { useLocation, Navigate } from "react-router-dom";
import Cookies from "js-cookie";

const RequireAuth = ({ children }) => {
  const location = useLocation();
  const token = Cookies.get("token");

  if (!token) {
    return <Navigate to="/sign-in" state={{ from: location }} />;
  }

  return children;
};


export default RequireAuth;