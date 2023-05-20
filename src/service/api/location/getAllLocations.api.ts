import axiosInstance from "@/service/axiosInstance"
import { LocationsResponse } from "@/types/responses/location"

interface PagingLocationProps {
  searchString: string
  page?: number
  limit?: number
}

export const getAllLocation = async (): Promise<LocationsResponse> => {
  try {
    const res = await axiosInstance.get(`/locations/`)
    return res.data
  } catch (error: any) {
    throw new Error(error.response.data.message)
  }
}

export const getPagingLocation = async ({
  searchString,
  page = 1,
  limit = 10,
}: PagingLocationProps): Promise<LocationsResponse> => {
  try {
    const res = await axiosInstance.get(
      `/locations?search=${searchString}&page=${page}&limit=${limit}`
    )
    return res.data
  } catch (error: any) {
    throw new Error(error.response.data.message)
  }
}
