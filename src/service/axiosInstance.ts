import { API_URL } from "@/utils/constant"
import {
  getAccessTokenFromLocal,
  getRefreshTokenFromLocal,
  setAccessTokenToLocal,
  setRefreshTokenToLocal,
  signOutUser,
} from "@/utils/localStorage"
import axios, { AxiosInstance } from "axios"
import { isAllowFormDataType } from "./utils"

const axiosInstance: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API,
})

export const setTokenInterceptor = (token: string | null) => {
  if (token) {
    axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`
  } else {
    delete axiosInstance.defaults.headers.common["Authorization"]
  }
}

axiosInstance.interceptors.request.use(
  (config: any) => {
    const token = getAccessTokenFromLocal()
    if (token) {
      config.headers["Authorization"] = "Bearer " + token
      config.headers["Content-Type"] = "application/json"
    }
    if (isAllowFormDataType(config.url)) {
      config.headers["Content-Type"] = "multipart/form-data"
    }
    return config
  },
  (error: any) => {
    return Promise.reject(error)
  }
)

axiosInstance.interceptors.response.use(
  (response: any) => {
    const originalRequest = response.config
    if (originalRequest && originalRequest._retry === true) {
      originalRequest._retry = false
    }
    return response
  },
  async (error: any) => {
    const originalRequest = error.config
    if (
      originalRequest.url !== "/auth/login/" &&
      (error.response.status === 401 || error.response.status === 403) &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true
      const refreshToken = getRefreshTokenFromLocal()
      try {
        const res = await axios.post(`${API_URL}/auth/refresh`, undefined, {
          headers: {
            Authorization: `Bearer ${refreshToken}`,
          },
        })
        const { accessToken, refreshToken: newRefreshToken } = res.data
        setAccessTokenToLocal(accessToken)
        setRefreshTokenToLocal(newRefreshToken)
        originalRequest.headers.Authorization = `Bearer ${accessToken}`
        originalRequest._retry = false

        if (originalRequest.method === "get") {
          return axiosInstance.get(originalRequest.url, {
            params: originalRequest.params,
          })
        }

        return axiosInstance(originalRequest)
      } catch (err: any) {
        if (err.response.status === 401 || err.response.status === 403) {
          signOutUser()
          window.location.replace("/login/signIn")
        }
        return Promise.reject(err)
      }
    }
    return Promise.reject(error)
  }
)

export default axiosInstance
