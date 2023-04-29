export const getCreatedDate = (date: string) => {
  return (
    date !== "" &&
    new Date(date)
      .toLocaleDateString("vi-VN", { timeZone: "Asia/Ho_Chi_Minh" })
      .replace(/\//g, "-")
  )
}

export const isAllowFileType = (fileType: string) => {
  const allowTypes = ["image/png", "image/jpeg", "image/jpg"]
  return allowTypes.includes(fileType)
}
