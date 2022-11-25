const useUser = () => {
  const { username, accessToken } = JSON.parse(
    localStorage.getItem("user") || "{}"
  )
  return { username, accessToken }
}

export default useUser
