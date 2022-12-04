import useUser from "@/hooks/useUser"
import { FunctionComponent, useEffect } from "react"
import { useNavigate } from "react-router-dom"

interface UnAuthLayoutProps {
  children: React.ReactNode
}

const UnAuthLayout: FunctionComponent<UnAuthLayoutProps> = ({ children }) => {
  const user = useUser()
  const navigator = useNavigate()
  useEffect(() => {
    if (user) {
      navigator("/")
    }
  }, [])

  return <div className="unAuth-layout py-[2rem]">{children}</div>
}

export default UnAuthLayout
