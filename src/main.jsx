import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import eruda from "eruda";

const env = process.env.NODE_ENV;

if (env !== "production") {
  eruda.init();
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
