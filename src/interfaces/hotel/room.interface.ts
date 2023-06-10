import { Bed } from "@/types/responses/hotel"

interface RoomImage {
  id: string
  imageKey: string
  imageUrl: string
}

export interface RoomType {
  id: string
  name: string
  numberOfBeds: number
  typeOfBed: string
  icon?: string
}

export interface RoomFeature {
  id: string
  name: string
  icon: string
}

export interface RoomBed {
  id: string
  numberOfBeds: number
  bed: Bed
}

export interface HotelRoom {
  id: string
  price: number
  numberOfRooms: number
  availableRooms: number
  sleeps: number
  isPrepay: boolean
  discounts: string[]
  roomTypes: RoomType[]
  roomFeatures: RoomFeature[]
  roomImages: RoomImage[]
  roomBeds: RoomBed[]
  isFreeCancellation: boolean
  freeCancellationPeriod: number | null
}
