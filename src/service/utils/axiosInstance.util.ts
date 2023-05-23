export const isAllowFormDataType = (requestURL: string) => {
  const allowedURLs = [
    "/user/update-profile-image/",
    "/user/update-cover-image/",
    "/locations/",
    "/review/create-review",
    "/review/update-review",
  ]
  return allowedURLs.includes(requestURL)
}
