import { Outlet } from "react-router-dom"

const Booking = () => {
  if (
    window.location.pathname === "/booking" ||
    window.location.pathname === "/booking/"
  ) {
    window.location.href = "/profile/my-bookings"
  }

  return <Outlet />
}

export default Booking
