import { getEmailFromLocal } from "@/utils/localStorage"
import React, { FunctionComponent } from "react"
import CodeField from "./components/CodeField"

interface VerifyProps {}

const Verify: FunctionComponent<VerifyProps> = () => {
  const email = getEmailFromLocal()

  return (
    <div className="mt-[2rem]">
      <h1 className="text-[1rem]">
        An email was sent to <strong>{email}</strong>
      </h1>
      <CodeField />
    </div>
  )
}

export default Verify
