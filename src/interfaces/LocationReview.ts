import UserReview from "./UserReview"

export default interface LocationReview {
  id: number
  title: string
  address: string
  description: string
  price: number
  rate: number
  userReviews?: any
  image?: string
}
