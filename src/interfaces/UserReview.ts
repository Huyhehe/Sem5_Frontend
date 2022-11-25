import User from "./User"

export default interface UserReview {
  id: number
  title: string
  description: string
  rate: number
  user: User
  timeWritten: string
  likes: number
}
