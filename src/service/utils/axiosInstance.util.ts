export const isAllowFormDataType = (requestURL: string) => {
  const allowedURLs = [
    "/user/update-profile-image/",
    "/user/update-cover-image/",
    "/locations/",
  ]
  return allowedURLs.includes(requestURL)
}
