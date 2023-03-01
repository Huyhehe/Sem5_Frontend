import { NotFound } from "@/pages/404"
import VerifyEmailSending from "@/pages/Authen/pages/Verify/pages/VerifyEmailSending"
import { VerifySending } from "@/pages/Authen/pages/Verify/pages/VerifySending"
import { lazy } from "react"
import type { RouteObject } from "react-router-dom"
import { createBrowserRouter, Outlet } from "react-router-dom"
import AuthLayout from "../layouts/AuthLayout"
import UnAuthLayout from "../layouts/UnAuthLayout"
import AuthenPage from "../pages/Authen"
const Booking = lazy(() => import("@/pages/Booking"))
const AddLocation = lazy(() => import("@/pages/Location"))
const Profile = lazy(() => import("@/pages/Profile"))
const ActivityFeed = lazy(() => import("@/pages/Profile/pages/activity-feed"))
const MyReviews = lazy(() => import("@/pages/Profile/pages/my-reviews"))
const Review = lazy(() => import("@/pages/Review"))
const LocationReviewPage = lazy(
  () => import("@/pages/Review/pages/LocationReview")
)
const ReviewEdit = lazy(() => import("@/pages/Review/pages/ReviewEdit"))
const EditPage = lazy(
  () => import("@/pages/Review/pages/ReviewEdit/pages/EditPage")
)
const About = lazy(() => import("../pages/About"))
const ForgotPassword = lazy(
  () => import("../pages/Authen/pages/ForgotPassword")
)
const SignInPage = lazy(() => import("../pages/Authen/pages/SignIn"))
const SignUpPage = lazy(() => import("../pages/Authen/pages/SignUp"))
const Verify = lazy(() => import("../pages/Authen/pages/Verify"))
const Home = lazy(() => import("../pages/Home"))
const Search = lazy(() => import("../pages/Search"))
const SearchResult = lazy(
  () => import("../pages/Search/pages/LocationSearchResultById")
)

const routes: RouteObject[] = [
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
            element: <VerifyEmailSending />,
          },
          {
            path: ":param1",
            element: <NotFound />,
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
        element: <MyReviews />,
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
      {
        path: "edit",
        element: <ReviewEdit />,
        children: [
          {
            path: ":id",
            element: <EditPage />,
          },
        ],
      },
    ],
  },
  {
    path: "/booking",
    element: (
      <AuthLayout>
        <Booking />
      </AuthLayout>
    ),
  },
  {
    path: "*",
    element: <NotFound />,
  },
]
export const router = createBrowserRouter(routes, {
  basename: "/",
})
