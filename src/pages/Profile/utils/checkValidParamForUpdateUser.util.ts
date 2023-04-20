import { UpdateAccountInfoRequest } from "@/types/requests"
import { UserInfoResponse } from "@/types/responses"

export const checkValidParamForUpdateUser = (
  params: UpdateAccountInfoRequest,
  userInfo: UserInfoResponse
) => {
  if (params.countryId === userInfo.address?.country?.name) {
    params = { ...params, countryId: userInfo.address?.country?.id }
  }
  if (params.provinceId === userInfo.address?.province?.name) {
    params = { ...params, provinceId: userInfo.address?.province?.id }
  }
  if (params.districtId === userInfo.address?.district?.name) {
    params = { ...params, districtId: userInfo.address?.district?.id }
  }
  if (params.wardId === userInfo.address?.ward?.name) {
    params = { ...params, wardId: userInfo.address?.ward?.id }
  }
  return params
}
