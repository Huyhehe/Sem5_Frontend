import { Pagination } from "@/interfaces/common"
import { Location } from "@/interfaces/location"

export type LocationsResponseData = Location[]

export type LocationsResponse = {
  data: LocationsResponseData
  pagination: Pagination
}
