import axiosInstance from "@/service/axiosInstance"

export const getHotelAmenities = async () => {
  try {
    const response = await axiosInstance.get("/propertyAmenities")
    return response.data
  } catch (error: any) {
    throw new Error(error.response.data.message)
  }
}
