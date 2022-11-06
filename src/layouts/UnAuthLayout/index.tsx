import { FunctionComponent } from "react"

interface UnAuthLayoutProps {
  children: React.ReactNode
}

const UnAuthLayout: FunctionComponent<UnAuthLayoutProps> = ({ children }) => {
  return <div className="unAuth-layout py-[2rem]">{children}</div>
}

export default UnAuthLayout
