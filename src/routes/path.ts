export const HOME_PATH = "/"
export const ABOUT_PATH = "/about"
export const ADD_LOCATION_PATH = "/location-add"
export const BOOKING_PATH = "/booking"

export const SEARCH_PATH = {
  DEFAULT: "/search",
  SEARCH_RESULT: ":id",
}
export const AUTHEN_PATH = {
  DEFAULT: "/login",
  SIGN_IN: "signIn",
  SIGN_UP: "signUp",
  FORGOT_PASSWORD: "forgotPassword",
  VERIFY: "verify",
  EMAIL_VERIFY: {
    DEFAULT: "email-verify",
    NOT_FOUND: ":param1",
    VERIFY_SENDING: ":param2",
  },
}
export const PROFILE_PATH = {
  DEFAULT: "/profile",
  MY_REVIEWS: "my-reviews",
  BOOKMARKS: "bookmarks",
  FOLLOWERS: "followers",
  FOLLOWING: "following",
}
export const REVIEW_PATH = {
  DEFAULT: "/review",
  REVIEW_PAGE: ":id",
  EDIT: {
    DEFAULT: "edit",
    EDIT_PAGE: ":id",
  },
}

export const ACCEPT_ALL_PATH = "*"