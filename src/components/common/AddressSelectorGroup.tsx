import {
  getCountries,
  getDistricts,
  getProvinces,
} from "@/service/api/addresss"
import { getWards } from "@/service/api/addresss/getWards.api"
import { UserInfoResponse } from "@/types/responses"
import { FormInstance } from "antd/es/form"
import message from "antd/es/message"
import { useEffect, useState } from "react"
import FormItem from "./FormItem"
import SelectorField from "./SelectorField"

interface AddressSelectorGroupProps {
  userInfo?: UserInfoResponse
  form: FormInstance
  required?: boolean
}

interface SelectOption {
  label: string
  value: string
}

interface LocationState {
  countries: SelectOption[]
  provinces: SelectOption[]
  districts: SelectOption[]
  wards: SelectOption[]
}

const initialLocationState: LocationState = {
  countries: [],
  provinces: [],
  districts: [],
  wards: [],
}

const extractDataToIdNameProps = (data: any) => {
  return {
    id: data.value,
    name: data.label,
  }
}

const AddressSelectorGroup = ({
  userInfo,
  form,
  required = false,
}: AddressSelectorGroupProps) => {
  const [locationState, setLocationState] =
    useState<LocationState>(initialLocationState)
  const [defaultLocations, setDefaultLocations] = useState({
    ...userInfo?.address,
  })

  const { countries, provinces, districts, wards } = locationState

  /* ===========HANDLE FETCH=========== */
  const handleFetchCountries = async () => {
    try {
      const countries = await getCountries()
      setLocationState((state) => ({ ...state, countries }))
    } catch (error: any) {
      console.log(error)
      message.error(error)
    }
  }

  const handleFetchProvinces = async (countryId: string) => {
    try {
      const provinces = await getProvinces(countryId)
      setLocationState((state) => ({ ...state, provinces }))
    } catch (error: any) {
      console.log(error)
      message.error(error)
    }
  }

  const handleFetchDistricts = async (provinceId: string) => {
    try {
      const districts = await getDistricts(provinceId)
      setLocationState((state) => ({ ...state, districts }))
    } catch (error: any) {
      console.log(error)
      message.error(error)
    }
  }

  const handleFetchWards = async (districtId: string) => {
    try {
      const wards = await getWards(districtId)
      setLocationState((state) => ({ ...state, wards }))
    } catch (error: any) {
      console.log(error)
      message.error(error)
    }
  }

  /* ===========HANDLE ON SELECT=========== */
  const handleCountrySelect = (value: string) => {
    if (value !== defaultLocations.country?.id) {
      form.setFieldsValue({
        provinceId: null,
        districtId: null,
        wardId: null,
      })
      setDefaultLocations((prev) => {
        return {
          ...prev,
          province: undefined,
          district: undefined,
          ward: undefined,
        }
      })
    }
    setDefaultLocations((prev: any) => {
      return {
        ...prev,
        country: extractDataToIdNameProps(
          countries?.find((country) => country.value === value)
        ),
      }
    })
    handleFetchProvinces(value)
  }

  const handleProvinceSelect = (value: string) => {
    if (value !== defaultLocations.province?.id) {
      form.setFieldsValue({
        districtId: null,
        wardId: null,
      })
      setDefaultLocations((prev) => {
        return {
          ...prev,
          district: undefined,
          ward: undefined,
        }
      })
    }
    setDefaultLocations((prev: any) => {
      return {
        ...prev,
        province: extractDataToIdNameProps(
          provinces?.find((province) => province.value === value)
        ),
      }
    })
    handleFetchDistricts(value)
  }

  const handleDistrictSelect = (value: string) => {
    if (value !== defaultLocations.district?.id) {
      form.setFieldsValue({
        wardId: null,
      })
      setDefaultLocations((prev) => {
        return {
          ...prev,
          ward: undefined,
        }
      })
    }
    setDefaultLocations((prev: any) => {
      return {
        ...prev,
        district: extractDataToIdNameProps(
          districts?.find((district) => district.value === value)
        ),
      }
    })
    handleFetchWards(value)
  }

  /* ===========HANDLE ON CLEAR=========== */
  const handleCountryClear = () => {
    setLocationState((state) => ({
      ...state,
      provinces: [],
      districts: [],
      wards: [],
    }))
    form.setFieldsValue({
      countryId: null,
      provinceId: null,
      districtId: null,
      wardId: null,
    })
    setDefaultLocations((prev) => {
      return {
        ...prev,
        country: undefined,
        province: undefined,
        district: undefined,
        ward: undefined,
      }
    })
  }

  const handleProvinceClear = () => {
    setLocationState((state) => ({
      ...state,
      districts: [],
      wards: [],
    }))
    form.setFieldsValue({
      provinceId: null,
      districtId: null,
      wardId: null,
    })
    setDefaultLocations((prev) => {
      return {
        ...prev,
        province: undefined,
        district: undefined,
        ward: undefined,
      }
    })
  }

  const handleDistrictClear = () => {
    setLocationState((state) => ({
      ...state,
      wards: [],
    }))
    form.setFieldsValue({
      districtId: null,
      wardId: null,
    })
    setDefaultLocations((prev) => {
      return {
        ...prev,
        district: undefined,
        ward: undefined,
      }
    })
  }

  useEffect(() => {
    handleFetchCountries()
  }, [])

  return (
    <>
      <FormItem
        name={"countryId"}
        label="Country"
        labelCol={{ span: 24 }}
        initialValue={userInfo?.address?.country?.name || null}
        required={required}
        message={required ? "Please select your country" : undefined}
      >
        <SelectorField
          placeholder="Country"
          options={countries}
          onSelect={handleCountrySelect}
          onClear={handleCountryClear}
        />
      </FormItem>
      <FormItem
        name={"provinceId"}
        label="Province"
        labelCol={{ span: 24 }}
        initialValue={userInfo?.address?.province?.name || null}
        required={required}
        message={required ? "Please select your province" : undefined}
      >
        <SelectorField
          allowClear
          placeholder="Province"
          options={provinces}
          onSelect={handleProvinceSelect}
          onFocus={() => {
            if (defaultLocations?.country?.id) {
              handleFetchProvinces(defaultLocations.country.id)
            }
          }}
          onClear={handleProvinceClear}
        />
      </FormItem>
      <FormItem
        name={"districtId"}
        label="District"
        labelCol={{ span: 24 }}
        initialValue={userInfo?.address?.district?.name || null}
        required={required}
        message={required ? "Please select your district" : undefined}
      >
        <SelectorField
          allowClear
          placeholder="District"
          options={districts}
          onSelect={handleDistrictSelect}
          onFocus={() => {
            if (defaultLocations?.province?.id) {
              handleFetchDistricts(defaultLocations.province.id)
            }
          }}
          onClear={handleDistrictClear}
        />
      </FormItem>
      <FormItem
        name={"wardId"}
        label="Ward"
        labelCol={{ span: 24 }}
        initialValue={userInfo?.address?.ward?.name || null}
        required={required}
        message={required ? "Please select your ward" : undefined}
      >
        <SelectorField
          allowClear
          placeholder="Ward"
          options={wards}
          onFocus={() => {
            if (defaultLocations?.district?.id) {
              handleFetchWards(defaultLocations.district.id)
            }
          }}
        />
      </FormItem>
    </>
  )
}

export default AddressSelectorGroup
