import { notification } from "antd"
import "antd/dist/reset.css"
import "mapbox-gl/dist/mapbox-gl.css"
import { ReactNode, createContext, useState } from "react"
import Loading from "./components/Loading"
import Routing from "./routes"
import { notificationColor } from "./utils/constant"

export const AppContext = createContext<any>({})

function App() {
  const [loading, setLoading] = useState(false)
  const [currentRoute, setCurrentRoute] = useState<string | null>(null)

  const [, contextHolder] = notification.useNotification()
  notification.config({
    placement: "bottomLeft",
  })
  const openNotification = (
    type: "success" | "error" | "info" | "warning",
    { message, description }: { message: ReactNode; description: ReactNode }
  ) => {
    notification[type]({
      message: `Notification ${message}`,
      description: description,
      style: {
        backgroundColor:
          type === "success"
            ? notificationColor.success
            : type === "error"
            ? notificationColor.error
            : type === "info"
            ? notificationColor.info
            : notificationColor.warning,
      },
    })
  }

  return (
    <AppContext.Provider
      value={{
        loading,
        setLoading,
        openNotification,
        currentRoute,
        setCurrentRoute,
      }}
    >
      {contextHolder}
      <div className="relative min-h-screen">
        <Routing />
        {loading && <Loading />}
      </div>
    </AppContext.Provider>
  )
}

export default App
