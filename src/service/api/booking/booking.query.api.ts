import axiosInstance from "@/service/axiosInstance"
import { BookingResponse } from "@/types/responses/booking"

export const getMyBookingHistory = async (): Promise<BookingResponse[]> => {
  try {
    const { data } = await axiosInstance.get("/booking")
    return data
  } catch (error: any) {
    throw new Error(error.response.data.message)
  }
}

export const getBookingDetail = async (
  bookingId: string
): Promise<BookingResponse> => {
  try {
    const { data } = await axiosInstance.get(
      `/booking/booking-by-id/${bookingId}`
    )
    return data
  } catch (error: any) {
    throw new Error(error.response.data.message)
  }
}

export const getBookingForOwner = async (): Promise<BookingResponse[]> => {
  try {
    const { data } = await axiosInstance.get("/booking/get-for-owner-hotel")
    return data
  } catch (error: any) {
    throw new Error(error.response.data.message)
  }
}
