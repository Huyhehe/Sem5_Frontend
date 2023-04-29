import axiosInstance from "@/service/axiosInstance"
import { API_URL } from "@/utils/constant"

export const updateCoverImage = async (coverImage: FormData) => {
  try {
    const { data } = await axiosInstance.patch(
      `${API_URL}/user/update-cover-image`,
      coverImage
    )
    return data
  } catch (error: any) {
    throw new Error(error.response.data.message)
  }
}
