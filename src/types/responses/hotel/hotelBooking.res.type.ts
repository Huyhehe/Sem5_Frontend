export interface ILocation {
  id: string
  name: string
  rating: number
  about: null | any
  description: string | null
  isHotel: boolean
  reviewCount: number
  locationImages: ILocationImage[]
  categories: ICategory[]
  address: IAddress
  imageUrlLocations: string[]
}

export interface ILocationImage {
  id: string
  imageKey: string
  imageUrl: string
}

export interface ICategory {
  id: string
  name: string
}

export interface IAddress {
  id: string
  streetAddress: string
  country: ICountry
  province: IProvince
  district: IDistrict
  ward: IWard
}

export interface ICountry {
  id: string
  name: string
  description: null | any
}

export interface IProvince {
  id: string
  name: string
  description: null | any
}

export interface IDistrict {
  id: string
  name: string
  description: null | any
}

export interface IWard {
  id: string
  name: string
}

export interface IRoom {
  id: string
  price: number
  numberOfRooms: number
  availableRooms: number
  sleeps: number
  isPrepay: boolean
  isFreeCancellation: boolean
  freeCancellationPeriod: number | null
}

export interface IHotelStyle {
  id: string
  name: string
}

export interface IPropertyAmenity {
  id: string
  name: string
  icon: string
}

export interface IHotelBooking {
  id: string
  phoneNumber: string
  email: string
  website: null | any
  hotelClass: number
  isRegistered: boolean
  location: ILocation
  rooms: IRoom[]
  hotelStyles: IHotelStyle[]
  propertyAmenities: IPropertyAmenity[]
  statusRegisterProgress: number
}
