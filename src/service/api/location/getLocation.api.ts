import axiosInstance from "@/service/axiosInstance"
import { SingleLocationResponse } from "@/types/responses/location"

export const getLocation = async (
  id: string
): Promise<SingleLocationResponse> => {
  try {
    const res = await axiosInstance.get(`/locations/${id}`)
    return res.data
  } catch (error: any) {
    throw new Error(error.response.data.message)
  }
}

export const addToWishlist = async (id: string) => {
  try {
    const res = await axiosInstance.post(`/locations/${id}/WishList`)
    return res.data
  } catch (error: any) {
    throw new Error(error.response.data.message)
  }
}

export const removeFromWishlist = async (id: string) => {
  try {
    const res = await axiosInstance.delete(`/wishlists/${id}/`)
    return res.data
  } catch (error: any) {
    throw new Error(error.response.data.message)
  }
}
