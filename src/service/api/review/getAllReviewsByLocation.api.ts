import axiosInstance from "@/service/axiosInstance"
import { ReviewsByLocationResponse } from "@/types/responses"

export const getAllReviewsByLocation = async (
  locationId: string
): Promise<ReviewsByLocationResponse[]> => {
  try {
    const response = await axiosInstance.get(
      `/review/get-reviews-by-location/${locationId}`
    )
    return response.data
  } catch (error: any) {
    throw new Error(error.response.data.message)
  }
}
