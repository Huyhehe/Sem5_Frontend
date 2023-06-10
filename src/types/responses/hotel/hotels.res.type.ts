import { Pagination } from "@/interfaces/common"
import { Hotel } from "@/interfaces/hotel"

export type PagingHotelResponse = {
  data: Hotel[]
  pagination: Pagination
}

interface RoomResponse {
  id: string
  price: number
  numberOfRooms: number
  availableRooms: number
  sleeps: number
  isPrepay: boolean
  isFreeCancellation: boolean
  freeCancellationPeriod: number | null
}

export type HotelResponse = Hotel & {
  rooms: RoomResponse[]
}
