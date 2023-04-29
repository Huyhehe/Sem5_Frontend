export const isAllowFormDataType = (requestURL: string) => {
  const allowedURLs = [
    "/user/update-profile-image/",
    "/user/update-cover-image/",
  ]
  return allowedURLs.includes(requestURL)
}
