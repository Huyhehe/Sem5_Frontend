interface AddressDetail {
  id: string
  name: string
}

export default interface UserInfo {
  id: string
  username: string
  email: string
  first_name: string
  last_name: string
  phone_number: string
  address: {
    country: AddressDetail
    province: AddressDetail
    district: AddressDetail
    street_address: string
  }
  profile_picture: string
  create_at?: any
  about?: string
}
