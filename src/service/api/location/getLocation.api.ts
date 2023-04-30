import axiosInstance from "@/service/axiosInstance"
import { SingleLocationResponse } from "@/types/responses/location"

export const getLocation = async (
  id: string
): Promise<SingleLocationResponse> => {
  try {
    const res = await axiosInstance.get(`/locations?id=${id}`)
    return res.data[0]
  } catch (error: any) {
    throw new Error(error.response.data.message)
  }
}
