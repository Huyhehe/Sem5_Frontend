import { getAllDistrictAPI } from "@/utils/http"

const getAllDistrict = async (
  stateAddress: any,
  setStateAddress: any,
  province_id: string
) => {
  try {
    const res = await getAllDistrictAPI(province_id)
    const options = res.map((item: any) => ({
      value: item.id,
      label: item.name,
    }))
    setStateAddress({
      ...stateAddress,
      districts: options,
    })
  } catch (error) {
    console.log(error)
  }
}
export default getAllDistrict
