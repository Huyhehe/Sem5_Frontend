import useUser from "@/hooks/useUser"
import { FunctionComponent, useEffect } from "react"
import NavBar from "../../components/NavBar"
import NavBarSignedIn from "@/components/NavBarSignedIn"

interface AuthLayoutProps {
  children: React.ReactNode
}

const AuthLayout: FunctionComponent<AuthLayoutProps> = ({ children }) => {
  const user = useUser()
  return (
    <div className="authLayout flex flex-col items-center relative">
      <div className="w-full flex justify-center sticky top-0 z-50 bg-white border-b">
        {user ? <NavBarSignedIn user={user} /> : <NavBar />}
      </div>
      <div className="xl:w-[1260px] w-[80%] mobile:w-full tablet:w-full mt-[2rem] flex justify-center">
        {children}
      </div>
    </div>
  )
}

export default AuthLayout
