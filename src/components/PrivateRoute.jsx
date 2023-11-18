import { Navigate } from "react-router-dom";
import { useAuthContext } from "../contexts/AuthContext";

export const PrivateRoute = ({ children }) => {
  const { address, loggedIn } = useAuthContext();
  return (
    <>{address && loggedIn ? children : <Navigate replace to="/login" />}</>
  );
};
