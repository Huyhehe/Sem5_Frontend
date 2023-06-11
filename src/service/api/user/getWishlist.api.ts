import axiosInstance from "@/service/axiosInstance"
import { API_URL } from "@/utils/constant"

export const getWishlist = async () => {
  try {
    const { data } = await axiosInstance.get(`${API_URL}/wishlists/`)
    return data
  } catch (error: any) {
    throw new Error(error)
  }
}
