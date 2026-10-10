import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/global.css";
import App from "./App";
import { AuthProvider } from "./context/AuthContext";
import { TicketProvider } from "./context/TicketContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <TicketProvider>
        <App />
      </TicketProvider>
    </AuthProvider>
  </StrictMode>
);
