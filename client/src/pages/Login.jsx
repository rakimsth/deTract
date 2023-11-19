import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MetaMaskButton } from "@metamask/sdk-react-ui";

import researchIcon from "../assets/research.jpeg";
import { WalletConnect } from "../components/WalletConnect";

import { useWalletConnect } from "../hooks/useWalletConnect";
import { useAuthContext } from "../contexts/AuthContext";

export default function Login() {
  const navigate = useNavigate();
  const { setLoggedIn, setAddress, setChainId, setSigner } = useAuthContext();
  const { isConnected, address, chainId, signer } = useWalletConnect();

  useEffect(() => {
    async function setUp() {
      if (isConnected && address && chainId && signer) {
        await setLoggedIn(true);
        await setAddress(address);
        await setChainId(chainId);
        await setSigner(signer);
        navigate("/dashboard");
      }
    }
    setUp();
  }, [isConnected]);

  return (
    <>
      <div>
        <header className="bg-white">
          <nav
            className="mx-auto flex  items-center justify-between p-6 lg:px-8"
            aria-label="Global"
          >
            <div className="flex lg:flex-1">
              <a href="#" className="-m-1.5 p-1.5">
                <span className="sr-only">Detract</span>
                <img className="h-8 w-auto" src={researchIcon} alt="" />
              </a>
              <h2 className="text-3xl ml-2">Detract</h2>
            </div>
          </nav>
        </header>
        <div className="mt-24 flex min-h-full flex-1 flex-col justify-center px-12 py-12 lg:px-12 h-fit items-center">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm text-center">
            <h2 className="mt-8 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Sign in to your account
            </h2>
          </div>

          <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-sm">
            <div>
              <div className="flex items-center justify-center">
                <span>
                  <WalletConnect />
                  <div className="pt-2">
                    <MetaMaskButton
                      theme={"dark"}
                      color="black"
                    ></MetaMaskButton>
                  </div>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
