import { Outlet } from "react-router-dom"

export default function Review() {
  document.title = "TravelCare | Review"
  return (
    <div className="w-full">
      <Outlet />
    </div>
  )
}
