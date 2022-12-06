export default interface UserInfo {
  account: {
    id: string
    username: string
    email: string
  }
  first_name: string
  last_name: string
  phone_number: string
  address: {
    country: string
    province: string
    district: string
    street_address: string
  }
  profile_picture: string
}
