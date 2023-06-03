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
}

export interface RoomFeature {
  id: string
  name: string
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
}
