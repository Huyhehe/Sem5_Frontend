import { NotFound } from "@/pages/404"
import VerifyEmailSending from "@/pages/Authen/pages/Verify/pages/VerifyEmailSending"
import { VerifySending } from "@/pages/Authen/pages/Verify/pages/VerifySending"
import { AddLocation } from "@/pages/Location"
import Profile from "@/pages/Profile"
import ActivityFeed from "@/pages/Profile/pages/activity-feed"
import { Review } from "@/pages/Review"
import { LocationReviewPage } from "@/pages/Review/pages/LocationReview"
import { createBrowserRouter, Outlet } from "react-router-dom"
import AuthLayout from "../layouts/AuthLayout"
import UnAuthLayout from "../layouts/UnAuthLayout"
import About from "../pages/About"
import AuthenPage from "../pages/Authen"
import ForgotPassword from "../pages/Authen/pages/ForgotPassword"
import SignInPage from "../pages/Authen/pages/SignIn"
import SignUpPage from "../pages/Authen/pages/SignUp"
import Verify from "../pages/Authen/pages/Verify"
import Home from "../pages/Home"
import Search from "../pages/Search"
import SearchResult from "../pages/Search/pages/LocationSearchResultById"
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
      {
        path: "forgotPassword",
        element: <ForgotPassword />,
      },
      {
        path: "verify",
        element: <Verify />,
      },
      {
        path: "email-verify",
        element: <Outlet />,
        children: [
          {
            path: "",
            element: <div>This page doesn't exist</div>,
          },
          {
            path: ":param1",
            element: <VerifyEmailSending />,
            children: [
              {
                path: ":param2",
                element: <VerifySending />,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    path: "/profile",
    element: (
      <AuthLayout>
        <Profile />
      </AuthLayout>
    ),
    children: [
      {
        index: true,
        element: <ActivityFeed />,
      },
      {
        path: "my-reviews",
        element: <div>My reviews</div>,
      },
      {
        path: "bookmarks",
        element: <div>Bookmarks</div>,
      },
      {
        path: "followers",
        element: <div>Followers</div>,
      },
      {
        path: "following",
        element: <div>Following</div>,
      },
    ],
  },
  {
    path: "/location-add",
    element: (
      <AuthLayout>
        <AddLocation />
      </AuthLayout>
    ),
  },
  {
    path: "review",
    element: (
      <AuthLayout>
        <Review />
      </AuthLayout>
    ),
    children: [
      {
        path: ":id",
        element: <LocationReviewPage />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
])
