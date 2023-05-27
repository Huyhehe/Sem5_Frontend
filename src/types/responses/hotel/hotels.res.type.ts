import { Pagination } from "@/interfaces/common"
import { Hotel } from "@/interfaces/hotel"

export type PagingHotelResponse = {
  data: Hotel[]
  pagination: Pagination
}
