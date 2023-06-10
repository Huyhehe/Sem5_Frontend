import { Address } from "@/interfaces/location"

export const checkValidParamForUpdateHotelGeneralInfo = (
  params: any,
  address: Address
) => {
  if (params.countryId === address?.country?.name) {
    params = { ...params, countryId: address?.country?.id }
  }
  if (params.provinceId === address?.province?.name) {
    params = { ...params, provinceId: address?.province?.id }
  }
  if (params.districtId === address?.district?.name) {
    params = { ...params, districtId: address?.district?.id }
  }
  if (params.wardId === address?.ward?.name) {
    params = { ...params, wardId: address?.ward?.id }
  }
  return { ...params }
}

export const freeCancellationPeriodOptions = [
  {
    label: "Before 1 day",
    value: 1,
  },
  {
    label: "Before 2 days",
    value: 2,
  },
  {
    label: "Before 3 days",
    value: 3,
  },
  {
    label: "Before 5 days",
    value: 5,
  },
  {
    label: "Before 7 days",
    value: 7,
  },
]
