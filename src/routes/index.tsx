import { FunctionComponent } from "react"
import { RouterProvider } from "react-router-dom"
import { router } from "./route"

interface RoutingProps {}

const Routing: FunctionComponent<RoutingProps> = () => {
  return <RouterProvider router={router} />
}

export default Routing
