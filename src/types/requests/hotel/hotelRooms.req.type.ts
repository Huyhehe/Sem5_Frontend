export type HotelRoomsRequest = {
  price: number
  numberOfRooms: number
  availableRooms: number
  sleeps: number
  isPrepay: boolean
  discountIds: string[]
  roomFeatureIds: string[]
  roomTypeIds: string[]
}
