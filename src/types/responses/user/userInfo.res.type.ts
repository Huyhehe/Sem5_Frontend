interface Address {
  id: string
  country: {
    id: string
    name: string
    description: string
  }
  province: {
    id: string
    name: string
    description: string
  }
  district: {
    id: string
    name: string
    description: string
  }
  ward: {
    id: string
    name: string
  }
  streetAddress: string
}

export type UserInfoResponse = {
  accountId: string
  account: {
    id: string
    username: string
    createAt: string
  }
  firstName: string
  lastName: string
  email: string
  phoneNumber: string
  profileImageUrl: string
  coverImageUrl: string
  about: string
  role: string
  isSale: true
  address?: Address | null
}
