import { UserInfoResponse } from "@/types/responses"
import { Dispatch, SetStateAction } from "react"

export type ProfileOutletContextType = {
  userInfo: UserInfoResponse
  setUserInfo: Dispatch<SetStateAction<UserInfoResponse>>
}
