import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./components/App/App";
// import { CacheProvider } from "./context/cache";
import "./style/index.scss";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    {/* <CacheProvider> */}
    <App />
    {/* </CacheProvider> */}
  </StrictMode>
);
