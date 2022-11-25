import User from "@/interfaces/User"

export const getEmailFromLocal = () => {
  return JSON.parse(localStorage?.getItem("email") || "null")
}

export const setEmailToLocal = (email: string) => {
  localStorage.setItem("email", JSON.stringify(email))
}

export const setAccessTokenToLocal = (accessToken: string) => {
  localStorage.setItem("accessToken", JSON.stringify(accessToken))
}

export const setUserToLocal = (user: User) => {
  localStorage.setItem("user", JSON.stringify(user))
}
