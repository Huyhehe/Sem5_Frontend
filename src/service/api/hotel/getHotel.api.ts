import { Hotel } from "@/interfaces/hotel"
import axiosInstance from "@/service/axiosInstance"

export const getHotel = async (hotelId: string): Promise<Hotel> => {
  try {
    const res = await axiosInstance.get(`/hotels/${hotelId}`)
    return res.data
  } catch (error: any) {
    throw new Error(error.response.data.message)
  }
}
