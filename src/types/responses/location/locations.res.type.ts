import { Pagination } from "@/interfaces/common"
import { Location } from "@/interfaces/location"

export type LocationsResponseData = Pick<
  Location,
  "id" | "name" | "description" | "rating" | "address" | "locationImages"
>[]

export type LocationsResponse = {
  data: LocationsResponseData
  pagination: Pagination
}
