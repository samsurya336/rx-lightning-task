import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";
import { PATIENTS_PRIVATE_ROUTES } from "./feature/patient/routes/private";
import { AUTH_PUBLIC_ROUTES } from "./feature/auth";
import { ErrorBoundary } from "./providers/ErrorBoundary";

const router = createBrowserRouter([
  ...AUTH_PUBLIC_ROUTES,
  ...PATIENTS_PRIVATE_ROUTES,
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ErrorBoundary>
      <RouterProvider router={router} />
    </ErrorBoundary>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
