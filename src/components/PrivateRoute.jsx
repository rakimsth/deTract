import { Navigate } from "react-router-dom";
import { useWalletConnect } from "../hooks/useWalletConnect";

export const PrivateRoute = ({ children }) => {
  const { address, isConnected } = useWalletConnect();
  return (
    <>{address && isConnected ? children : <Navigate replace to="/login" />}</>
  );
};
