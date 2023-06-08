import { Hotel } from "@/interfaces/hotel"
import axiosInstance from "@/service/axiosInstance"
import { PagingHotelResponse } from "@/types/responses/hotel/hotels.res.type"

export interface PrivateHotel extends Hotel {
  statusRegisterProgress: number
}

export const getPagingHotel = async (): Promise<PagingHotelResponse> => {
  try {
    const { data } = await axiosInstance.get("/hotels")
    return data
  } catch (error: any) {
    throw new Error(error.response.data.message)
  }
}

export const getPrivateHotels = async (): Promise<PrivateHotel[]> => {
  try {
    const { data } = await axiosInstance.get("/user/hotels")
    return data
  } catch (error: any) {
    throw new Error(error.response.data.message)
  }
}
