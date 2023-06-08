import { HotelRoom } from "@/interfaces/hotel"
import axiosInstance from "@/service/axiosInstance"
import { HotelRoomsRequest } from "@/types/requests"

export const createHotelRoomAPI = async (
  data: HotelRoomsRequest,
  hotelId: string
): Promise<HotelRoom> => {
  try {
    if (!Array.isArray(data.roomTypeIds)) {
      data.roomTypeIds = [data.roomTypeIds]
    }
    const res = await axiosInstance.post(`/hotels/${hotelId}/rooms`, data)
    return res.data
  } catch (error: any) {
    throw new Error(error.response.data.message)
  }
}

export const updateHotelRoomAPI = async (
  data: HotelRoomsRequest,
  roomId: string
): Promise<HotelRoom> => {
  try {
    if (!Array.isArray(data.roomTypeIds)) {
      data.roomTypeIds = [data.roomTypeIds]
    }
    const res = await axiosInstance.patch(`/rooms/${roomId}`, data)
    return res.data
  } catch (error: any) {
    throw new Error(error.response.data.message)
  }
}

export const deleteHotelRoomAPI = async (roomId: string): Promise<void> => {
  try {
    await axiosInstance.delete(`/rooms/${roomId}`)
  } catch (error: any) {
    throw new Error(error.response.data.message)
  }
}
