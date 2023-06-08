import axiosInstance from "@/service/axiosInstance"

export const requestCreateHotel = async (hotelId: string): Promise<void> => {
  try {
    const { data } = await axiosInstance.post(`/hotels/${hotelId}/register`)
    return data
  } catch (error: any) {
    throw new Error(error.response.data.message)
  }
}
