import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./Css/index.css";
import "antd/dist/antd.min.css";
import "./API/config";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
