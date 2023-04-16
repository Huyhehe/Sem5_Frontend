import axios from "axios"
import { API_URL } from "@/utils/constant"
import { convertDataForSelectOptions } from "@/utils/reusable"

export const getWards = async (districtId: string) => {
  try {
    const res = await axios.get(`${API_URL}/address/wards/${districtId}`)
    return convertDataForSelectOptions(res.data)
  } catch (error: any) {
    throw new Error(error.response.data.message)
  }
}
