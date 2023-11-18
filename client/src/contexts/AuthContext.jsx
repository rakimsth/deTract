import {
  useEffect,
  useState,
  useContext,
  createContext,
  useCallback,
} from "react";
import { useWalletConnect } from "../hooks/useWalletConnect";

const AuthContext = createContext(null);

export default function AuthContextProvider({ children }) {
  const {
    address: add,
    chainId: chain,
    isConnected,
    signer: sign,
  } = useWalletConnect();

  const [loggedIn, setLoggedIn] = useState(false);
  const [address, setAddress] = useState("");
  const [signer, setSigner] = useState(null);
  const [chainId, setChainId] = useState("");

  const initialize = useCallback(() => {
    setLoggedIn(isConnected);
    setAddress(add);
    setChainId(chain);
    setSigner(sign);
  }, [add, chain, isConnected]);

  useEffect(() => {
    initialize();
  }, [initialize]);

  return (
    <AuthContext.Provider
      value={{
        loggedIn,
        setLoggedIn,
        address,
        setAddress,
        signer,
        setSigner,
        chainId,
        setChainId,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context)
    throw new Error(
      "Auth Context must be wrapped inside Auth Context Provider"
    );
  return context;
};
