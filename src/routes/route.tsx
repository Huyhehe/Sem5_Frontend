import { createBrowserRouter } from "react-router-dom"
import AuthLayout from "../layouts/AuthLayout"
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
