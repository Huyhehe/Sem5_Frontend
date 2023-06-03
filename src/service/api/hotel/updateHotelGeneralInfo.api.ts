import axiosInstance from "@/service/axiosInstance"
import { SingleLocationResponse } from "@/types/responses/location"

export const updateHotelGeneralInfoAPI = async (
  data: any,
  locationId: string
): Promise<SingleLocationResponse> => {
  try {
    const res = await axiosInstance.patch(`/locations/${locationId}`, data)
    return res.data
  } catch (error: any) {
    throw new Error(error.response.data.messages[0].message)
  }
}
