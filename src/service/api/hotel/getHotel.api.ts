import axiosInstance from "@/service/axiosInstance"
import { HotelResponse } from "@/types/responses/hotel"

export const getHotel = async (hotelId: string): Promise<HotelResponse> => {
  try {
    const res = await axiosInstance.get(`/hotels/${hotelId}`)
    return res.data
  } catch (error: any) {
    throw new Error(error.response.data.message)
  }
}
