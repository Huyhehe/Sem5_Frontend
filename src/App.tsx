import Routing from "./routes"
import "antd/dist/antd.css"
import { createContext, useState } from "react"
import Loading from "./components/Loading"
import type { NotificationPlacement } from "antd/es/notification"
import { notification } from "antd"

export const AppContext = createContext<any>({})

function App() {
  const [loading, setLoading] = useState(false)
  const [api, contextHolder] = notification.useNotification()
  notification.config({
    placement: "bottomLeft" as NotificationPlacement,
  })
  const openNotification = (
    type: "success" | "error" | "info" | "warning",
    { message, description }: { message: string; description: string }
  ) => {
    notification[type]({
      message: `Notification ${message}`,
      description: description,
      style: {
        backgroundColor: type === "success" ? "#f1ffea" : "#feeced",
      },
    })
  }
  return (
    <AppContext.Provider value={{ loading, setLoading, openNotification }}>
      {contextHolder}
      <div className="relative min-h-screen">
        <Routing />
        {loading && <Loading />}
      </div>
    </AppContext.Provider>
  )
}

export default App
