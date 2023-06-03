export type SignInResponseUser = {
  accountId: string
  firstName: string
  lastName: string
  email: string
  phoneNumber: string
  profileImageUrl: string
  coverImageUrl: string
  about: string
  role: string
  isSale: boolean
  account: {
    id: string
    username: string
  }
}

export type SignInResponse = {
  user: SignInResponseUser
  tokens: {
    accessToken: string
    refreshToken: string
  }
}
