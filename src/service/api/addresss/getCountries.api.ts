import axios from "axios"
import { API_URL } from "@/utils/constant"
import { convertDataForSelectOptions } from "@/utils/reusable"

export const getCountries = async () => {
  try {
    const res = await axios.get(`${API_URL}/address/countries/`)
    return convertDataForSelectOptions(res.data)
  } catch (error: any) {
    throw new Error(error.response.data.message)
  }
}
