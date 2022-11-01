import { FunctionComponent, useEffect } from "react"

interface AuthLayoutProps {
  children: React.ReactNode
}

const AuthLayout: FunctionComponent<AuthLayoutProps> = ({ children }) => {
  return (
    <>
      <div>auth layout</div>
      {children}
    </>
  )
}

export default AuthLayout
