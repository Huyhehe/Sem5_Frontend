export const publicAPI = {
  provinces: "https://provinces.open-api.vn/api/?depth=3",
}

export const mapBoxGlAPI = import.meta.env.VITE_MAP_BOX_GL_KEY

export const autofillAPI = import.meta.env.VITE_AUTOFILL_KEY

export const API_URL = import.meta.env.VITE_API

export const PAYPAL_CLIENT = import.meta.env.VITE_PAYPAL_CLIENT_ID

export const navItems = [
  {
    title: "Home",
    link: "/",
  },
  {
    title: "Search",
    link: "/search",
  },
  {
    title: "Booking",
    link: "/booking",
  },
  {
    title: "About",
    link: "/about",
  },
]

export const notificationColor = {
  success: "#f1ffea",
  error: "#feeced",
  warning: "#fff7e6",
  info: "#e6f7ff",
}
