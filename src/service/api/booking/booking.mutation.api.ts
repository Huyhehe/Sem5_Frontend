import axiosInstance from "@/service/axiosInstance"

export type BookingRoomNoPaymentRequest = {
  rooms: {
    roomId: string
    numberOfRooms: number
  }[]

  checkIn: string
  checkOut: string
  customerName: string
}

export const deleteBooking = async (bookingId: string) => {
  try {
    const { data } = await axiosInstance.delete(`/booking/${bookingId}`)
    return data
  } catch (error: any) {
    throw new Error(error.response.data.message)
  }
}

export const bookingWithoutPayment = async (
  request: BookingRoomNoPaymentRequest
) => {
  try {
    const { data } = await axiosInstance.post(`/booking`, request)
    return data
  } catch (error: any) {
    throw new Error(error.response.data.message)
  }
}
