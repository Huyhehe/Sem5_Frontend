import NotFound from "@/pages/404"
import VerifyEmailSending from "@/pages/Authen/pages/Verify/pages/VerifyEmailSending"
import VerifySending from "@/pages/Authen/pages/Verify/pages/VerifySending"
import Booking from "@/pages/Booking"

import Profile from "@/pages/Profile"
import ActivityFeed from "@/pages/Profile/pages/activity-feed"
import MyReviews from "@/pages/Profile/pages/my-reviews"
import Review from "@/pages/Review"
import LocationReviewPage from "@/pages/Review/pages/LocationReview"
import ReviewEdit from "@/pages/Review/pages/ReviewEdit"
import EditPage from "@/pages/Review/pages/ReviewEdit/pages/EditPage"
import type { RouteObject } from "react-router-dom"
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
import {
  ABOUT_PATH,
  ACCEPT_ALL_PATH,
  ADD_LOCATION_PATH,
  AUTHEN_PATH,
  BOOKING_PATH,
  HOME_PATH,
  PROFILE_PATH,
  REVIEW_PATH,
  SEARCH_PATH,
} from "./path"
import AddLocation from "@/pages/Location"

const routes: RouteObject[] = [
  {
    path: HOME_PATH,
    element: (
      <AuthLayout>
        <Home />
      </AuthLayout>
    ),
  },
  {
    path: SEARCH_PATH.DEFAULT,
    element: (
      <AuthLayout>
        <Search />
      </AuthLayout>
    ),
    children: [
      {
        path: SEARCH_PATH.SEARCH_RESULT,
        element: <SearchResult />,
      },
    ],
  },
  {
    path: ABOUT_PATH,
    element: (
      <AuthLayout>
        <About />
      </AuthLayout>
    ),
  },
  {
    path: AUTHEN_PATH.DEFAULT,
    element: (
      <UnAuthLayout>
        <AuthenPage />
      </UnAuthLayout>
    ),
    children: [
      {
        path: AUTHEN_PATH.SIGN_IN,
        element: <SignInPage />,
      },
      {
        path: AUTHEN_PATH.SIGN_UP,
        element: <SignUpPage />,
      },
      {
        path: AUTHEN_PATH.FORGOT_PASSWORD,
        element: <ForgotPassword />,
      },
      {
        path: AUTHEN_PATH.VERIFY,
        element: <Verify />,
      },
      {
        path: AUTHEN_PATH.EMAIL_VERIFY.DEFAULT,
        element: <Outlet />,
        children: [
          {
            path: "",
            element: <VerifyEmailSending />,
          },
          {
            path: AUTHEN_PATH.EMAIL_VERIFY.NOT_FOUND,
            element: <NotFound />,
            children: [
              {
                path: AUTHEN_PATH.EMAIL_VERIFY.VERIFY_SENDING,
                element: <VerifySending />,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    path: PROFILE_PATH.DEFAULT,
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
        path: PROFILE_PATH.MY_REVIEWS,
        element: <MyReviews />,
      },
      {
        path: PROFILE_PATH.BOOKMARKS,
        element: <div>Bookmarks</div>,
      },
      {
        path: PROFILE_PATH.FOLLOWERS,
        element: <div>Followers</div>,
      },
      {
        path: PROFILE_PATH.FOLLOWING,
        element: <div>Following</div>,
      },
    ],
  },
  {
    path: ADD_LOCATION_PATH,
    element: (
      <AuthLayout>
        <AddLocation />
      </AuthLayout>
    ),
  },
  {
    path: REVIEW_PATH.DEFAULT,
    element: (
      <AuthLayout>
        <Review />
      </AuthLayout>
    ),
    children: [
      {
        path: REVIEW_PATH.REVIEW_PAGE,
        element: <LocationReviewPage />,
      },
      {
        path: REVIEW_PATH.EDIT.DEFAULT,
        element: <ReviewEdit />,
        children: [
          {
            path: REVIEW_PATH.EDIT.EDIT_PAGE,
            element: <EditPage />,
          },
        ],
      },
    ],
  },
  {
    path: BOOKING_PATH,
    element: (
      <AuthLayout>
        <Booking />
      </AuthLayout>
    ),
  },
  {
    path: ACCEPT_ALL_PATH,
    element: <NotFound />,
  },
]
export const router = createBrowserRouter(routes, {
  basename: "/",
})
