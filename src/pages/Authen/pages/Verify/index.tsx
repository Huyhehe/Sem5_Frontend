import React, { FunctionComponent } from "react"
import { useOutletContext } from "react-router-dom"
import CodeField from "./components/CodeField"

interface VerifyProps {}
type ContextType = {
  email: string | null
  setEmail: React.Dispatch<React.SetStateAction<string | null>>
}

const Verify: FunctionComponent<VerifyProps> = () => {
  const { email, setEmail } = useOutletContext<ContextType>()
  console.log(email, setEmail)

  return (
    <div className="mt-[2rem]">
      <h1 className="text-[1rem]">An email was sent to {email}</h1>
      <CodeField />
    </div>
  )
}

export default Verify
