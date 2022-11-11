import { createBrowserRouter, Outlet } from "react-router-dom"
import AuthLayout from "../layouts/AuthLayout"
import UnAuthLayout from "../layouts/UnAuthLayout"
import About from "../pages/About"
import AuthenPage from "../pages/Authen"
import SignInPage from "../pages/Authen/SignIn"
import SignUpPage from "../pages/Authen/SignUp"
import Home from "../pages/Home"
import Search from "../pages/Search"
import SearchResult from "../pages/Search/pages/SearchResultById"
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
    path: "/search",
    element: (
      <AuthLayout>
        <Search />
      </AuthLayout>
    ),
    children: [
      {
        path: ":id",
        element: <SearchResult />,
      },
    ],
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
        <AuthenPage />
      </UnAuthLayout>
    ),
    children: [
      {
        path: "signIn",
        element: <SignInPage />,
      },
      {
        path: "signUp",
        element: <SignUpPage />,
      },
    ],
  },
])
