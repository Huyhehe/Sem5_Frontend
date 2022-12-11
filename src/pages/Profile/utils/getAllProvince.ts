import { getAllProvinceAPI } from "@/utils/http"

const getAllProvince = async (
  stateAddress: any,
  setStateAddress: any,
  country_id: string
) => {
  try {
    const res = await getAllProvinceAPI(country_id)
    const options = res.map((item: any) => ({
      value: item.id,
      label: item.name,
    }))
    setStateAddress({
      ...stateAddress,
      provinces: options,
    })
  } catch (error) {
    console.log(error)
  }
}
export default getAllProvince
