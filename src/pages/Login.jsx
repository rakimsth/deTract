import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm text-center">
            <h2 className="text-5xl">DeTract</h2>
            <img
              className="mx-auto h-10 w-auto"
              src={researchIcon}
              width={512}
              alt="Detract Icon"
            />
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Sign in to your account
            </h2>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="space-y-6" action="#" method="POST">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Password
                  </label>
                </div>
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Sign in
                </button>
              </div>
            </form>

            <p className="mt-10 text-center text-sm text-gray-500">
              Not a member? &nbsp;
              <a
                href="/register"
                className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
              >
                Register now
              </a>
            </p>
          </div>
          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <div className="my-4 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
              <p className="mx-4 mb-0 text-center font-semibold dark:text-dark">
                Or
              </p>
            </div>
            <div>
              <div className="flex items-center justify-center">
                <span>
                  <WalletConnect />
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
