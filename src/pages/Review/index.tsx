import { Outlet } from "react-router-dom"

interface ReviewProps {}

export const Review = ({ ...props }: ReviewProps) => {
  document.title = "TravelCare | Review"
  return (
    <div className="w-full">
      <Outlet />
    </div>
  )
}
