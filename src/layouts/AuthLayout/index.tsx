import { FunctionComponent, useEffect } from "react"
import NavBar from "../../components/NavBar"

interface AuthLayoutProps {
  children: React.ReactNode
}

const AuthLayout: FunctionComponent<AuthLayoutProps> = ({ children }) => {
  return (
    <div className="authLayout flex flex-col items-center relative">
      <div className="w-full flex justify-center sticky top-0 z-50 bg-white border-b">
        <NavBar />
      </div>
      <div className="xl:max-w-[1260px] md:max-w-[768px] sm:max-w-[480px] mobile:max-w-[200px] mt-[2rem]">
        {children}
      </div>
    </div>
  )
}

export default AuthLayout
