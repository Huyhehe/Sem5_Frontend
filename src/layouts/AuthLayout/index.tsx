import { FunctionComponent, useEffect } from "react"
import NavBar from "../../components/NavBar"

interface AuthLayoutProps {
  children: React.ReactNode
}

const AuthLayout: FunctionComponent<AuthLayoutProps> = ({ children }) => {
  return (
    <>
      <div>
        <NavBar />
      </div>
      {children}
    </>
  )
}

export default AuthLayout
