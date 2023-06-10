import axiosInstance from "@/service/axiosInstance"

export const createLocationAPI = async (data: any) => {
  try {
    const res = await axiosInstance.post("/locations/", data)
    return res.data
  } catch (error: any) {
    throw new Error(error.response.data.messages[0].message)
  }
}

export const updateLocationAPI = async (
  formData: any,
  locationId: string
): Promise<Location> => {
  try {
    const { data } = await axiosInstance.patch(
      `/locations/${locationId}`,
      formData
    )
    return data
  } catch (error: any) {
    throw new Error(error.response.data.message)
  }
}

export const removeLocationImageAPI = async (
  locationId: string,
  imageId: string
) => {
  try {
    const { data } = await axiosInstance.delete(
      `/locations/delete-location-image/${locationId}/${imageId}`
    )
    return data
  } catch (error: any) {
    throw new Error(error.response.data.message)
  }
}

export const uploadLocationImageAPI = async (
  locationId: string,
  formData: any
) => {
  try {
    const { data } = await axiosInstance.patch(
      `/locations/upload-location-image/${locationId}`,
      formData
    )
    return data
  } catch (error: any) {
    throw new Error(error.response.data.message)
  }
}
