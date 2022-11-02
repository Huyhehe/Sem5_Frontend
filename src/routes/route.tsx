import { createBrowserRouter } from "react-router-dom"
import AuthLayout from "../layouts/AuthLayout"
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
    element: <></>,
    children: [
      {
        path: "signIn",
        element: <div>Sign In</div>,
      },
    ],
  },
])
