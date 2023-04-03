import { Suspense } from "react"
import { RouterProvider } from "react-router-dom"
import { router } from "./routes"
import { Spin } from "antd"
const Routing = () => {
  return (
    <Suspense fallback={<Spin />}>
      <RouterProvider router={router} />
    </Suspense>
  )
}

export default Routing
