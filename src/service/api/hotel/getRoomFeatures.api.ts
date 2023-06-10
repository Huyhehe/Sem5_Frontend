import axiosInstance from "@/service/axiosInstance"
import { RoomFeature } from "@/types/responses/hotel"

export const getRoomFeatures = async (): Promise<RoomFeature[]> => {
  try {
    const res = await axiosInstance.get(`/roomFeatures`)
    return res.data
  } catch (error: any) {
    throw new Error(error.response.data.message)
  }
}
