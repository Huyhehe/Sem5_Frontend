import { Suspense } from "react"
import { RouterProvider } from "react-router-dom"
import { router } from "./routes"
import Fallback from "@/components/Fallback"

const Routing = () => {
  return (
    <Suspense fallback={<Fallback />}>
      <RouterProvider router={router} />
    </Suspense>
  )
}

export default Routing
