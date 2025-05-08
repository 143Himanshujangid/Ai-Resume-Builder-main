import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { RouterProvider, createBrowserRouter, createHashRouter } from "react-router-dom";
import HomePage from "./pages/home/HomePage.jsx";
import Dashboard from "./pages/dashboard/Dashboard.jsx";
import { EditResume } from "./pages/dashboard/edit-resume/[resume_id]/EditResume.jsx";
import ViewResume from "./pages/dashboard/view-resume/[resume_id]/ViewResume.jsx";
import TemplatesPage from "./pages/dashboard/templates/TemplatesPage.jsx";
import AuthPage from "./pages/auth/customAuth/AuthPage.jsx";
import { resumeStore } from "./store/store";
import { Provider } from "react-redux";

// Using HashRouter for GitHub Pages compatibility
const router = createHashRouter([
  {
    element: <App />,
    children: [
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/dashboard/edit-resume/:resume_id",
        element: <EditResume />,
      },
      {
        path: "/dashboard/view-resume/:resume_id",
        element: <ViewResume />,
      },
      {
        path: "/dashboard/templates/:resume_id",
        element: <TemplatesPage />,
      },
    ],
  },
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/auth/sign-in",
    element: <AuthPage />,
  },
]);
ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={resumeStore}>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </Provider>
);
