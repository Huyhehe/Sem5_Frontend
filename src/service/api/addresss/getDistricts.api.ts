import axios from "axios"
import { API_URL } from "@/utils/constant"
import { convertDataForSelectOptions } from "@/utils/reusable"

export const getDistricts = async (provinceId: string) => {
  try {
    const res = await axios.get(`${API_URL}/address/districts/${provinceId}`)
    return convertDataForSelectOptions(res.data)
  } catch (error: any) {
    throw new Error(error.response.data.message)
  }
}
