import axiosInstance from "@/service/axiosInstance"

export const uploadRoomImages = async (roomId: string, images: any[]) => {
  try {
    const formData = new FormData()
    images.forEach((image) => {
      formData.append("images", image.originFileObj)
    })
    const { data } = await axiosInstance.post(
      `/rooms/${roomId}/uploadImages`,
      formData
    )
    return data
  } catch (error: any) {
    throw new Error(error.response.data.message)
  }
}

export const removeRoomImages = async (roomId: string, imageId: string) => {
  try {
    const { data } = await axiosInstance.delete(
      `/rooms/${roomId}/deleteImages/${imageId}`
    )
    return data
  } catch (error: any) {
    throw new Error(error.response.data.message)
  }
}
