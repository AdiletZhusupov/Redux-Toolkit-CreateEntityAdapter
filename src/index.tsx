import React from "react";
import ReactDOM from "react-dom/client";
import { StoreProvider } from "./app/providers/StoreProvider";
import App from "./app/App";
import "./app/styles/styles.css";

const rootElement = document.getElementById("root")!;
const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <StoreProvider>
      <App />
    </StoreProvider>
  </React.StrictMode>
);
