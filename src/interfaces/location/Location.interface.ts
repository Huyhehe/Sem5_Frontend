import { Category } from "@/types/responses"
import { Country, Province, District, Ward } from "../location"
import { Hotel } from "../hotel"

export interface LocationImage {
  id: string
  imageKey: string
  imageUrl: string
}

interface Address {
  id: string
  streetAddress: string
  country: Country
  province: Province
  district: District
  ward: Ward
}

export interface Location {
  id: string
  name: string
  rating: string
  about: string | null
  description: string | null
  isHotel: boolean
  reviewCount: number
  locationImages: LocationImage[]
  categories: Category[]
  address: Address
  reviews: string[]
  hotel: Omit<Hotel, "location"> | null
}
