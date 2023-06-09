export interface UserReviewRequestType {
  title: string
  content: string
  rating: number
  tripTime: string
  tripTypeId: string
  images?: any[]
  [key: string]: any
}

export interface CreateReviewRequestType extends UserReviewRequestType {
  locationId: string
}

export interface UpdateReviewRequestType extends UserReviewRequestType {
  reviewId: string
}
