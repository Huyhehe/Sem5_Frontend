import axiosInstance from "@/service/axiosInstance"

export const createLocationReview = async (formData: any) => {
  try {
    const { data } = await axiosInstance.post("/review/create-review", formData)
    return data
  } catch (error: any) {
    throw new Error(error.response.data.message)
  }
}

export const updateLocationReview = async (formData: any) => {
  try {
    const { data } = await axiosInstance.patch(
      "/review/update-review",
      formData
    )
    return data
  } catch (error: any) {
    throw new Error(error.response.data.message)
  }
}

export const deleteImageReviewAPI = async (
  reviewId: string,
  imageId: string
) => {
  try {
    const { data } = await axiosInstance.delete(
      `/review/delete-review-image/${reviewId}/${imageId}`
    )
    return data
  } catch (error: any) {
    throw new Error(error.response.data.error)
  }
}
