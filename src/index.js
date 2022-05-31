import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
const container = document.getElementById("root");

const app = createRoot(container);
app.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
