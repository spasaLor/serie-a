import { StrictMode } from "react";
import App from "../App";
import { createRoot } from "react-dom/client";

function Main() {
  return (
    <StrictMode>
      <App />
    </StrictMode>
  );
}
createRoot(document.getElementById("root")).render(<Main />);
