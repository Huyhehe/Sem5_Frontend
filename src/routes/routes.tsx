import AuthLayout from "@/layouts/AuthLayout"
import UnAuthLayout from "@/layouts/UnAuthLayout"
import React from "react"
import { createBrowserRouter, Outlet } from "react-router-dom"
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

const NotFoundPage = React.lazy(() => import("../pages/404"))

const HomePage = React.lazy(() => import("../pages/Home"))

const AboutPage = React.lazy(() => import("../pages/About"))

const SearchPage = React.lazy(() => import("../pages/Search"))
const SearchResultPage = React.lazy(
  () => import("../pages/Search/pages/LocationSearchResultById")
)

const AuthenPage = React.lazy(() => import("../pages/Authen"))
const SignInPage = React.lazy(() => import("../pages/Authen/pages/SignIn"))
const SignUpPage = React.lazy(() => import("../pages/Authen/pages/SignUp"))
const VerifyPage = React.lazy(() => import("../pages/Authen/pages/Verify"))
const ForgotPasswordPage = React.lazy(
  () => import("../pages/Authen/pages/ForgotPassword")
)
const VerifyEmailSendingPage = React.lazy(
  () => import("../pages/Authen/pages/Verify/pages/VerifyEmailSending")
)
const VerifySendingPage = React.lazy(
  () => import("../pages/Authen/pages/Verify/pages/VerifySending")
)

const ProfilePage = React.lazy(() => import("../pages/Profile"))
const ActivityFeedPage = React.lazy(
  () => import("../pages/Profile/pages/activity-feed")
)
const MyReviewsPage = React.lazy(
  () => import("../pages/Profile/pages/my-reviews")
)

const AddLocationPage = React.lazy(() => import("../pages/Location"))

const ReviewPage = React.lazy(() => import("../pages/Review"))
const LocationReviewPage = React.lazy(
  () => import("../pages/Review/pages/LocationReview")
)
const ReviewEditPage = React.lazy(
  () => import("../pages/Review/pages/ReviewEdit")
)
const EditPage = React.lazy(
  () => import("../pages/Review/pages/ReviewEdit/pages/EditPage")
)

const BookingPage = React.lazy(() => import("../pages/Booking"))

const routes = [
  {
    path: HOME_PATH,
    element: (
      <AuthLayout>
        <HomePage />
      </AuthLayout>
    ),
  },
  {
    path: SEARCH_PATH.DEFAULT,
    element: (
      <AuthLayout>
        <SearchPage />
      </AuthLayout>
    ),
    children: [
      { path: SEARCH_PATH.SEARCH_RESULT, element: <SearchResultPage /> },
    ],
  },
  {
    path: ABOUT_PATH,
    element: (
      <AuthLayout>
        <AboutPage />
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
        element: <ForgotPasswordPage />,
      },
      {
        path: AUTHEN_PATH.VERIFY,
        element: <VerifyPage />,
      },
      {
        path: AUTHEN_PATH.EMAIL_VERIFY.DEFAULT,
        element: <Outlet />,
        children: [
          {
            path: "",
            element: <VerifyEmailSendingPage />,
          },
          {
            path: AUTHEN_PATH.EMAIL_VERIFY.NOT_FOUND,
            element: <NotFoundPage />,
            children: [
              {
                path: AUTHEN_PATH.EMAIL_VERIFY.VERIFY_SENDING,
                element: <VerifySendingPage />,
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
        <ProfilePage />
      </AuthLayout>
    ),
    children: [
      {
        index: true,
        element: <ActivityFeedPage />,
      },
      {
        path: PROFILE_PATH.MY_REVIEWS,
        element: <MyReviewsPage />,
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
        <AddLocationPage />
      </AuthLayout>
    ),
  },

  {
    path: REVIEW_PATH.DEFAULT,
    element: (
      <AuthLayout>
        <ReviewPage />
      </AuthLayout>
    ),
    children: [
      {
        path: REVIEW_PATH.REVIEW_PAGE,
        element: <LocationReviewPage />,
      },
      {
        path: REVIEW_PATH.EDIT.DEFAULT,
        element: <ReviewEditPage />,
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
        <BookingPage />
      </AuthLayout>
    ),
  },
  {
    path: ACCEPT_ALL_PATH,
    element: <NotFoundPage />,
  },
]
export const router = createBrowserRouter(routes, {
  basename: "/",
})
