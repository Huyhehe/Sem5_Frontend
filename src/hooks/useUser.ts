import { SignInResponseUser } from "@/types/responses"

const useUser = (): SignInResponseUser | null => {
  if (localStorage.getItem("user") !== null) {
    const user = JSON.parse(localStorage.getItem("user") as string)
    return user
  }
  return null
}

export default useUser
