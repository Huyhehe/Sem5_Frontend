import axiosInstance from "@/service/axiosInstance"
import { UpdateAccountInfoRequest } from "@/types/requests/user/updateUser.req.type"
import { API_URL } from "@/utils/constant"

export const updateAccountInfo = async (data: UpdateAccountInfoRequest) => {
  try {
    const response = await axiosInstance.patch(
      `${API_URL}/user/update-user`,
      data
    )
    return response.data
  } catch (error: any) {
    throw new Error(error)
  }
}
