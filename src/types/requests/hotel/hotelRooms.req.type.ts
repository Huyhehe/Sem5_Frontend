export type RoomBed = {
  bedId: string
  numberOfBed: number
}

export type HotelRoomsRequest = {
  price: number
  numberOfRooms: number
  availableRooms: number
  sleeps: number
  isPrepay: boolean
  isFreeCancellation: boolean
  freeCancellationPeriod: number | null
  discountIds: string[]
  roomFeatureIds: string[]
  roomTypeIds: string[]
  roomBeds: RoomBed[]
}
