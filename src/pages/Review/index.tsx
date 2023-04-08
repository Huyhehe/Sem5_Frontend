import { Outlet } from "react-router-dom"

interface ReviewProps { }

export default function Review({ ...props }: ReviewProps) {
  document.title = "TravelCare | Review"
  return (
    <div className="w-full">
      <Outlet />
    </div>
  )
}
