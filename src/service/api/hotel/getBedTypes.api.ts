import axiosInstance from "@/service/axiosInstance"
import { SelectType } from "@/types/responses/common"
import { Bed } from "@/types/responses/hotel"

export const getBedTypes = async (): Promise<SelectType[]> => {
  try {
    const { data: beds } = await axiosInstance.get<Bed[]>(`/beds`)
    return beds.map((bed) => ({
      ...bed,
      name: bed.type,
    }))
  } catch (error: any) {
    throw new Error(error.response.data.message)
  }
}
