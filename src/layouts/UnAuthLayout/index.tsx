import useUser from "@/hooks/useUser"
import { Suspense, useEffect } from "react"
import { useNavigate } from "react-router-dom"

interface UnAuthLayoutProps {
  children: React.ReactNode
}

const UnAuthLayout = ({ children }: UnAuthLayoutProps) => {
  const user = useUser()
  const navigator = useNavigate()
  useEffect(() => {
    if (user) {
      navigator("/")
    }
  }, [])

  return (
    <Suspense fallback={<div>loadign...</div>}>
      <div className="unAuth-layout py-[1.5rem]">{children}</div>
    </Suspense>
  )
}

export default UnAuthLayout
