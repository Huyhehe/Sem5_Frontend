import UserReview from "./UserReview"

interface Category {
  id: string
  name: string
}
interface Address {
  country: string
  province: string
  district: string
  street_address: string
}

export default interface LocationReview {
  id: string
  address: Address
  name: string
  description: string
  price_level: number
  rating: string
  category?: Category
  userReviews?: any
  image?: string
}
