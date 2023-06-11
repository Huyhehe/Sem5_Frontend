import axiosInstance from "@/service/axiosInstance"

export const removeHotel = async (hotelId: string) => {
  try {
    const { data } = await axiosInstance.delete(`/hotels/${hotelId}`)
    return data
  } catch (error: any) {
    throw new Error(error.response.data.message)
  }
}
