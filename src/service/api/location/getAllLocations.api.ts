import axiosInstance from "@/service/axiosInstance"
import { LocationsResponse } from "@/types/responses/location"

export const getAllLocation = async (): Promise<LocationsResponse> => {
  try {
    const res = await axiosInstance.get(`/locations/`)
    return res.data
  } catch (error: any) {
    throw new Error(error.response.data.message)
  }
}
