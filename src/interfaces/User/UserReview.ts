interface User {
  account: {
    id: string
    username: string
  }
  address: {
    id: string
    country: string
    province: string
    district: string
    street_address: string
  }
  profile_picture: string
}
interface Image {
  id: string
  image: string
}

export default interface UserReview {
  id: string
  location: string
  title: string
  content: string
  rating: string
  user: User
  trip_time: string
  trip_type: {
    id: string
    name: string
    localized_name: string
  }
  review_date: string
  images: Image[]
}
