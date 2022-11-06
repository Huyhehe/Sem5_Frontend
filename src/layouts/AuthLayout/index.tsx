import { FunctionComponent, useEffect } from "react"
import NavBar from "../../components/NavBar"

interface AuthLayoutProps {
  children: React.ReactNode
}

const AuthLayout: FunctionComponent<AuthLayoutProps> = ({ children }) => {
  return (
    <div className="authLayout flex flex-col items-center relative">
      <div className="w-full sticky top-0 z-10 bg-white">
        <NavBar />
      </div>
      <div className="max-w-[1260px]">{children}</div>
    </div>
  )
}

export default AuthLayout
