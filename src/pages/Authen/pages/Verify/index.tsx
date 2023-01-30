import { getEmailFromLocal } from "@/utils/localStorage"

const Verify = () => {
  const email = getEmailFromLocal()

  return (
    <div className="mt-[2rem]">
      <h1 className="text-[1rem]">
        An email was sent to <strong>{email}</strong>
      </h1>
    </div>
  )
}

export default Verify
