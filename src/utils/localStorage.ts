export const getEmailFromLocal = () => {
  return JSON.parse(localStorage?.getItem("email") || "null")
}

export const setEmailFromLocal = (email: string) => {
  localStorage.setItem("email", JSON.stringify(email))
}
