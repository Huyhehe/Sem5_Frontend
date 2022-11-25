export const getEmailFromLocal = () => {
  return JSON.parse(localStorage?.getItem("email") || "null")
}

export const setEmailToLocal = (email: string) => {
  localStorage.setItem("email", JSON.stringify(email))
}
