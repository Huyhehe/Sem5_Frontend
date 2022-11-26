const useUser = () => {
  const { username, accessToken } = JSON.parse(
    localStorage.getItem("user") || "null"
  )
  return { username, accessToken }
}

export default useUser
