import Routing from "./routes"
import "antd/dist/antd.css"
import { createContext, useState } from "react"
import Loading from "./components/Loading"

export const AppContext = createContext<any>({})

function App() {
  const [loading, setLoading] = useState(false)
  return (
    <AppContext.Provider value={{ loading, setLoading }}>
      <div className="relative min-h-screen">
        <Routing />
        {loading && <Loading />}
      </div>
    </AppContext.Provider>
  )
}

export default App
