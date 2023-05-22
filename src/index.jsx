import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";
import UserContextProvider from "./context/userContext";
const rootElement = document.getElementById("root");

createRoot(rootElement).render(
  <UserContextProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </UserContextProvider>
);
