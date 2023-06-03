import axiosInstance from "@/service/axiosInstance"
import { SelectType } from "@/types/responses/common"

export const getTripTypes = async (): Promise<SelectType[]> => {
  try {
    const res = await axiosInstance.get("/review/get-trip-type")
    return res.data
  } catch (error: any) {
    throw new Error(error.response.data.message)
  }
}
