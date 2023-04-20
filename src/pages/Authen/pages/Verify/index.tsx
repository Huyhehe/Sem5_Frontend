import { getEmailFromLocal } from "@/utils/localStorage"
import { Link } from "react-router-dom"

const Verify = () => {
  const email = getEmailFromLocal()

  return (
    <div className="mt-[2rem]">
      <h1 className="text-[1.25rem]">
        An email was sent to <strong>{email}</strong>
      </h1>
      <p>
        Go to{" "}
        <Link
          to="/login/signIn"
          className="underline font-medium text-secondary"
        >
          Sign In
        </Link>
      </p>
    </div>
  )
}

export default Verify
