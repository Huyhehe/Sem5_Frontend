import axiosInstance from "@/service/axiosInstance"

export const getHotelStyles = async () => {
  try {
    const response = await axiosInstance.get("/hotelStyles")
    return response.data
  } catch (error: any) {
    throw new Error(error.response.data.message)
  }
}
