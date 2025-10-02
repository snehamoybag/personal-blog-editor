import type { RouteObject } from "react-router";
import Root from "./Root";
import IndexPage from "./pages/IndexPage";
import ErrorPage from "./pages/ErrorPage";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,

    children: [
      {
        index: true,
        element: <IndexPage />,
      },

      {
        path: "/signup",
        element: <SignupPage />,
      },

      {
        path: "/login",
        element: <LoginPage />,
      },
    ],
  },
];

export default routes;
