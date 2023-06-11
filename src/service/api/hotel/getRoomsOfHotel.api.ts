import { HotelRoom } from "@/interfaces/hotel"
import axiosInstance from "@/service/axiosInstance"
import { HotelRoomsResponse } from "@/types/responses/hotel"

interface HotelRoomFilters {
  checkIn: string
  checkOut: string
  sleeps: number
  numberOfRooms: number
}

export const getRoomsOfHotel = async (
  hotelId: string,
  filters?: HotelRoomFilters
): Promise<HotelRoomsResponse> => {
  if (!filters) {
    const { data } = await axiosInstance.get(`/hotels/${hotelId}/rooms`)
    return data
  }
  const { checkIn, checkOut, sleeps, numberOfRooms } = filters
  try {
    const { data } = await axiosInstance.get(
      `/hotels/${hotelId}/rooms?checkIn=${checkIn}&checkOut=${checkOut}&sleeps=${sleeps}&numberOfRooms=${numberOfRooms}`
    )
    return data
  } catch (error: any) {
    throw new Error(error.response.data.message)
  }
}

export const getRoom = async (roomId: string): Promise<HotelRoom> => {
  try {
    const { data } = await axiosInstance.get(`/rooms/${roomId}`)
    return data
  } catch (error: any) {
    throw new Error(error.response.data.message)
  }
}
