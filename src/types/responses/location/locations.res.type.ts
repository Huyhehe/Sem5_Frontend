import { Location } from "@/interfaces/location"

export type LocationsResponse = Pick<
  Location,
  "id" | "name" | "description" | "rating" | "address" | "locationImages"
>[]
