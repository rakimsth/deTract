import "./main.css";
import React from "react";
import ReactDOM from "react-dom/client";
import { MetaMaskUIProvider } from "@metamask/sdk-react-ui";

import App from "./App.jsx";
import AuthContextProvider from "./contexts/AuthContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <MetaMaskUIProvider
      sdkOptions={{
        dappMetadata: {
          name: "Detract react app",
        },
      }}
    >
      <AuthContextProvider>
        <App />
      </AuthContextProvider>
    </MetaMaskUIProvider>
  </React.StrictMode>
);
