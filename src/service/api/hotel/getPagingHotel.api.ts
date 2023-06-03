import axiosInstance from "@/service/axiosInstance"
import { PagingHotelResponse } from "@/types/responses/hotel/hotels.res.type"

export const getPagingHotel = async (): Promise<PagingHotelResponse> => {
  try {
    const res = await axiosInstance.get("/hotels")
    return res.data
  } catch (error: any) {
    throw new Error(error.response.data.message)
  }
}
