import { createBrowserRouter, Outlet } from "react-router-dom"
import AuthLayout from "../layouts/AuthLayout"
import UnAuthLayout from "../layouts/UnAuthLayout"
import About from "../pages/About"
import Home from "../pages/Home"
export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <AuthLayout>
        <Home />
      </AuthLayout>
    ),
  },
  {
    path: "/about",
    element: (
      <AuthLayout>
        <About />
      </AuthLayout>
    ),
  },
  {
    path: "/login",
    element: (
      <UnAuthLayout>
        <Outlet />
      </UnAuthLayout>
    ),
    children: [
      {
        path: "signIn",
        element: <div>Sign In</div>,
      },
    ],
  },
])
