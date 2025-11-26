import type { RouteObject } from "react-router";
import Root from "./Root";
import ErrorPage from "./pages/ErrorPage";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import LogoutPage from "./pages/LogoutPage";
import NewPage from "./pages/NewPage";
import EditPage from "./pages/EditPage";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,

    children: [
      {
        index: true,
        element: <NewPage />,
      },

      {
        path: "/signup",
        element: <SignupPage />,
      },

      {
        path: "/login",
        element: <LoginPage />,
      },

      {
        path: "/logout",
        element: <LogoutPage />,
      },

      {
        path: "/new",
        element: <NewPage />,
      },

      { path: "/edit/:blogId", element: <EditPage /> },
    ],
  },
];

export default routes;
