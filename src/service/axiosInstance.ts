import { getAccessTokenFromLocal } from "@/utils/localStorage"
import axios, { AxiosInstance, AxiosRequestConfig } from "axios"

const axiosInstance: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API,
})

export const setTokenInterceptor = (token: string | null) => {
  console.log(token)
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
    }
    return config
  },
  (error: any) => {
    return Promise.reject(error)
  }
)

export default axiosInstance
