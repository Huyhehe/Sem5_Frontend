import axiosInstance from "@/service/axiosInstance"

export const requestPublish = async (hotelId: string): Promise<void> => {
  try {
    const { data } = await axiosInstance.patch(`/hotels/${hotelId}/register`)
    return data
  } catch (error: any) {
    throw new Error(error.response.data.message)
  }
}
