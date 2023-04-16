import axiosInstance from "@/service/axiosInstance"
import { API_URL } from "@/utils/constant"

export const getAccount = async () => {
  try {
    const { data } = await axiosInstance.get(`${API_URL}/user/`)
    return data
  } catch (error: any) {
    throw new Error(error)
  }
}
