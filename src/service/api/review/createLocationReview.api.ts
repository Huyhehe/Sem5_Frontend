import axiosInstance from "@/service/axiosInstance"

export const createLocationReview = async (data: any) => {
  try {
    const res = await axiosInstance.post("/review/create-review", data)
    return res.data
  } catch (error: any) {
    throw new Error(error.response.data.message)
  }
}
