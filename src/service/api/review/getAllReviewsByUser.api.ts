import axiosInstance from "@/service/axiosInstance"
import { ReviewsByUserResponse } from "@/types/responses"

export const getAllReviewByCurrentUser =
  async (): Promise<ReviewsByUserResponse> => {
    try {
      const res = await axiosInstance.get("/review/get-review-by-current-user")
      return res.data
    } catch (error: any) {
      throw new Error(error.response.data.message)
    }
  }
