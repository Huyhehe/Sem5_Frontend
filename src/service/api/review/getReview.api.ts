import { UserReview } from "@/interfaces/review"
import axiosInstance from "@/service/axiosInstance"

export const getReviewByReviewId = async (id: string): Promise<UserReview> => {
  try {
    const res = await axiosInstance.get(`/review/get-review/${id}`)
    return res.data
  } catch (error: any) {
    throw new Error(error.response.data.error)
  }
}
