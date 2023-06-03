import axiosInstance from "@/service/axiosInstance"

export const createLocationAPI = async (data: any) => {
  try {
    const res = await axiosInstance.post("/locations/", data)
    return res.data
  } catch (error: any) {
    throw new Error(error.response.data.messages[0].message)
  }
}
