import axiosInstance from "@/service/axiosInstance"
import { HotelRoomsResponse } from "@/types/responses/hotel"

export const getRoomsOfHotel = async (
  hotelId: string
): Promise<HotelRoomsResponse> => {
  try {
    const res = await axiosInstance.get(`/hotels/${hotelId}/rooms`)
    return res.data
  } catch (error: any) {
    throw new Error(error.response.data.message)
  }
}
