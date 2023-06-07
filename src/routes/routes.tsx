import AuthLayout from "@/layouts/AuthLayout"
import UnAuthLayout from "@/layouts/UnAuthLayout"
import { lazy } from "react"
import { createBrowserRouter, Outlet, RouteObject } from "react-router-dom"
import {
  ABOUT_PATH,
  ACCEPT_ALL_PATH,
  ADD_LOCATION_PATH,
  AUTHEN_PATH,
  HOTEL_PATH,
  HOME_PATH,
  HOTEL_BOOKING_PATH,
  PROFILE_PATH,
  REVIEW_PATH,
  SEARCH_PATH,
} from "./path"

const NotFoundPage = lazy(() => import("../pages/404"))

const HomePage = lazy(() => import("../pages/Home"))

const AboutPage = lazy(() => import("../pages/About"))

const SearchPage = lazy(() => import("../pages/Search"))
const SearchResultPage = lazy(
  () => import("../pages/Search/pages/LocationSearchResultById")
)

const AuthenPage = lazy(() => import("../pages/Authen"))
const SignInPage = lazy(() => import("../pages/Authen/pages/SignIn"))
const SignUpPage = lazy(() => import("../pages/Authen/pages/SignUp"))
const VerifyPage = lazy(() => import("../pages/Authen/pages/Verify"))
const ForgotPasswordPage = lazy(
  () => import("../pages/Authen/pages/ForgotPassword")
)
const VerifyEmailSendingPage = lazy(
  () => import("../pages/Authen/pages/Verify/pages/VerifyEmailSending")
)
const VerifySendingPage = lazy(
  () => import("../pages/Authen/pages/Verify/pages/VerifySending")
)

const ProfilePage = lazy(() => import("../pages/Profile"))
const ActivityFeedPage = lazy(
  () => import("../pages/Profile/pages/activity-feed")
)
const MyReviewsPage = lazy(() => import("../pages/Profile/pages/my-reviews"))
const Business = lazy(() => import("../pages/Profile/pages/business"))

const AddLocationPage = lazy(() => import("../pages/Location"))

const ReviewPage = lazy(() => import("../pages/Review"))
const LocationReviewPage = lazy(
  () => import("../pages/Review/pages/LocationReview")
)
const ReviewEditPage = lazy(() => import("../pages/Review/pages/ReviewEdit"))
const EditPage = lazy(
  () => import("../pages/Review/pages/ReviewEdit/pages/EditPage")
)

const BookingPage = lazy(() => import("../pages/Booking"))

const HotelAddingPage = lazy(
  () => import("../pages/Booking/hotels/hotel-adding")
)
const GeneralInfo = lazy(
  () => import("../pages/Booking/hotels/hotel-adding/GeneralInfo")
)
const CreateHotelRooms = lazy(
  () => import("../pages/Booking/hotels/hotel-adding/CreateHotelRooms")
)

const HotelBookingPage = lazy(() => import("../pages/HotelBooking"))

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
      {
        path: PROFILE_PATH.BUSINESS,
        element: <Business />,
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
    path: HOTEL_PATH.DEFAULT,
    element: (
      <AuthLayout>
        <Outlet />
      </AuthLayout>
    ),
    children: [
      {
        index: true,
        element: <BookingPage />,
      },
      {
        path: HOTEL_PATH.HOTEL_ADD.DEFAULT,
        element: <HotelAddingPage />,
        children: [
          {
            path: HOTEL_PATH.HOTEL_ADD.GENERAL_INFO,
            element: <GeneralInfo />,
          },
          {
            path: HOTEL_PATH.HOTEL_ADD.ROOMS,
            element: <CreateHotelRooms />,
          },
        ],
      },
    ],
  },

  {
    path: HOTEL_BOOKING_PATH.DEFAULT,
    element: <AuthLayout>
      <HotelBookingPage />
    </AuthLayout>,
  },
  {
    path: ACCEPT_ALL_PATH,
    element: <NotFoundPage />,
  },
]
export const router = createBrowserRouter(routes, {
  basename: "/",
})
