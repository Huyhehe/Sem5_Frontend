import { Hotel, HotelRoom } from "@/interfaces/hotel"

type Room = HotelRoom & {
  hotel: Hotel
}

export type BookingResponse = {
  id: string
  checkIn: string
  checkOut: string
  CustomerName: string
  cancellationPay: string
  refund: string
  isPaid: string
  totalAmount: string
  createdAt: string
  updatedAt: string | null
  isSuccess: boolean
  user: {
    accountId: string
    firstName: string
    lastName: string
    email: string
    phoneNumber: string
    account: {
      id: string
      username: string
    }
  }
  bookingRooms: {
    id: string
    numberOfRooms: number
    room: Room
  }[]
  paypal: {
    id: string
    transactionId: string
    paidAt: string
  }
}
