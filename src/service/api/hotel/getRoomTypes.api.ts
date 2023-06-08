import axiosInstance from "@/service/axiosInstance"
import { RoomType } from "@/types/responses/hotel"

export const getRoomTypes = async (): Promise<RoomType[]> => {
  try {
    const res = await axiosInstance.get(`/roomTypes`)
    return res.data
  } catch (error: any) {
    throw new Error(error.response.data.message)
  }
}
