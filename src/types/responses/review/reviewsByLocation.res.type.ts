import { Country, District, Province, Ward } from "@/interfaces/location"

interface ReviewImage {
  id: string
  imageUrl: string
  imageKey: string
}

export type ReviewsByLocationResponse = {
  id: string
  rating: string
  reviewAt: string
  updateAt: string
  tripTime: string
  title: string
  content: string
  tripType: {
    id: string
    name: string
  }
  user: {
    accountId: string
    firstName: string
    lastName: string
    profileImageUrl: string
    account: {
      username: string
    }
    address: {
      id: string
      country: Country
      province: Province
      district: District
      ward: Ward
      streetAddress: string
    }
  }
  reviewImages: ReviewImage[]
}
