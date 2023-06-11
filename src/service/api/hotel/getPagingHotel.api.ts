import { Hotel } from "@/interfaces/hotel"
import axiosInstance from "@/service/axiosInstance"
import { PagingHotelResponse } from "@/types/responses/hotel/hotels.res.type"

interface PagingHotelRequest {
  search: string
  checkIn: string
  checkOut: string
  sleeps: number
  numberOfRooms: number
}
export interface PrivateHotel extends Hotel {
  statusRegisterProgress: number
}

export const getPagingHotel = async (
  filters?: PagingHotelRequest
): Promise<PagingHotelResponse> => {
  try {
    if (filters) {
      const { search, checkIn, checkOut, sleeps, numberOfRooms } = filters
      const { data } = await axiosInstance.get(
        `/hotels?search=${search}&checkIn=${checkIn}&checkOut=${checkOut}&sleeps=${sleeps}&numberOfRooms=${numberOfRooms}`
      )
      return data
    }
    const { data } = await axiosInstance.get(`/hotels`)
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
