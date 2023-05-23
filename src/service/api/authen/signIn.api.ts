import axiosInstance, { setTokenInterceptor } from "@/service/axiosInstance"
import { SignInRequest } from "@/types/requests"
import { SignInResponse } from "@/types/responses"
import {
  setAccessTokenToLocal,
  setRefreshTokenToLocal,
} from "@/utils/localStorage"

export const signInAPI = async (
  user: SignInRequest
): Promise<SignInResponse> => {
  try {
    const res = await axiosInstance.post(`/auth/login/`, user)
    setTokenInterceptor(res.data.tokens.accessToken)
    setAccessTokenToLocal(res.data.tokens.accessToken)
    setRefreshTokenToLocal(res.data.tokens.refreshToken)
    return res.data
  } catch (error: any) {
    throw new Error(error.response.data.message)
  }
}
