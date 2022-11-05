import { FunctionComponent } from "react"

interface UnAuthLayoutProps {
  children: React.ReactNode
}

const UnAuthLayout: FunctionComponent<UnAuthLayoutProps> = ({ children }) => {
  return (
    <>
      <div>Unauth Layout</div>
      {children}
    </>
  )
}

export default UnAuthLayout
