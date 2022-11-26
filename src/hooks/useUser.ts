const useUser = () => {
  if (localStorage.getItem("user") !== null) {
    const { username, accessToken } = JSON.parse(
      localStorage.getItem("user") as string
    )
    return { username, accessToken }
  }
  return null
}

export default useUser
