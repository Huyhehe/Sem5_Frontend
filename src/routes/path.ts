export const HOME_PATH = "/"
export const ABOUT_PATH = "/about"
export const ADD_LOCATION_PATH = "/location-add"

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
  BUSINESS: "business",
  MY_BOOKINGS: "my-bookings",
  OWNER_BOOKING_LIST: "manage-booking",
}
export const REVIEW_PATH = {
  DEFAULT: "/review",
  REVIEW_PAGE: ":id",
  EDIT: {
    DEFAULT: "edit",
    EDIT_PAGE: ":id",
  },
}

export const HOTEL_BOOKING_PATH = {
  DEFAULT: "hotel-booking",
  DETAIL: ":id",
}

export const HOTEL_PATH = {
  DEFAULT: "/hotels",
  HOTEL_PAGE: ":id",
  HOTEL_ADD: {
    DEFAULT: "create-hotel",
    GENERAL_INFO: "general-info",
    ROOMS: "create-rooms",
    IMAGES: "images",
    CONFIRM: "confirm",
  },
}

export const BOOKING_PATH = {
  DEFAULT: "/booking",
  PAYMENT: "checkout",
  HISTORY: {
    INDEX: "history",
    DETAIL: ":id",
  },
}

export const ACCEPT_ALL_PATH = "*"
