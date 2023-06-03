import { HotelAmenity, HotelStyle } from "@/types/responses/hotel"
import { Address, Location } from "../location"

export interface Hotel {
  id: string
  phoneNumber: string
  email: string
  website: string
  hotelClass: number
  location: Location
  address: Address
  hotelStyles: HotelStyle[]
  propertyAmenities: HotelAmenity[]
}
