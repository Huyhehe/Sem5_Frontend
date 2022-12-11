import { getAllCountryAPI } from "@/utils/http"

const getAllCountry = async (stateAddress: any, setStateAddress: any) => {
  try {
    const res = await getAllCountryAPI()
    const options = res.map((item: any) => ({
      value: item.id,
      label: item.name,
    }))
    setStateAddress({
      ...stateAddress,
      countries: options,
    })
  } catch (error) {
    console.log(error)
  }
}
export default getAllCountry
