import { HotelRoom } from "@/interfaces/hotel"
import axiosInstance from "@/service/axiosInstance"
import { HotelRoomsRequest } from "@/types/requests"

export const createHotelRoom = async (
  data: HotelRoomsRequest,
  hotelId: string
): Promise<HotelRoom> => {
  try {
    const res = await axiosInstance.post(`/hotels/${hotelId}/rooms`, data)
    return res.data
  } catch (error: any) {
    throw new Error(error.response.data.message)
  }
}
