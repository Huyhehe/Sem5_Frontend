import { Location } from "@/interfaces/location"
import axiosInstance from "@/service/axiosInstance"

export const privateHotelImageUpload = async (
  images: any,
  locationId: string
): Promise<Location> => {
  try {
    const formData = new FormData()
    if (images?.fileList?.length > 0) {
      for (const file of images?.fileList) {
        formData.append("images", file.originFileObj)
      }
    }
    formData.append("isHotel", "true")
    const { data } = await axiosInstance.patch(
      `/locations/${locationId}/images`,
      formData
    )
    return data
  } catch (error: any) {
    throw new Error(error.response.data.message)
  }
}
