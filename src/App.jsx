import { BrowserRouter, Routes, Route } from "react-router-dom";
import { createWeb3Modal, defaultConfig } from "@web3modal/ethers5/react";

import Layout from "./Layouts/Layout";
import Login from "./pages/Login";
import Papers from "./pages/Papers";
import Dashboard from "./pages/Dashboard";
import Register from "./pages/Register";
import ErrorPage from "./pages/404";
import { PrivateRoute } from "./components/PrivateRoute";
import Details from "./pages/Details";

// 1. Get projectId
const projectId = "fa5d8effe043bedf529652291d0a00bf";

// 2. Set chains
const mainnet = {
  chainId: 1,
  name: "Ethereum",
  currency: "ETH",
  explorerUrl: "https://etherscan.io",
  rpcUrl: "https://cloudflare-eth.com",
};

// 3. Create modal
const metadata = {
  name: "DeTract",
  description: "Retract your Paper",
  url: "https://mywebsite.com",
  icons: ["https://avatars.mywebsite.com/"],
};

createWeb3Modal({
  ethersConfig: defaultConfig({ metadata }),
  chains: [mainnet],
  projectId,
});

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Layout />}>
            <Route
              index
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            />
            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            />
            <Route path="/papers/:id*" element={<Details />} />
            <Route
              path="/papers"
              element={
                <PrivateRoute>
                  <Papers />
                </PrivateRoute>
              }
            />

            <Route path="*" element={<ErrorPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
