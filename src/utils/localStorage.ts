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

export const getAccessTokenFromLocal = () => {
  return JSON.parse(localStorage?.getItem("accessToken") || "null")
}

export const setRefreshTokenToLocal = (refreshToken: string) => {
  localStorage.setItem("refreshToken", JSON.stringify(refreshToken))
}

export const getRefreshTokenFromLocal = () => {
  return JSON.parse(localStorage?.getItem("refreshToken") || "null")
}

export const clearTokens = () => {
  localStorage.removeItem("accessToken")
  localStorage.removeItem("refreshToken")
}

export const setUserToLocal = (user: User) => {
  localStorage.setItem("user", JSON.stringify(user))
}

export const signOutUser = () => {
  localStorage.removeItem("user")
  clearTokens()
}
