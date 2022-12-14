import { getAllTripTypeAPI } from "./http"

const getAllTripType = async (setTripTypes: any) => {
  try {
    const res = await getAllTripTypeAPI()
    const options = res.map((item: any) => ({
      value: item.id,
      label: item.name,
    }))
    return setTripTypes(options)
  } catch (error: any) {
    throw new Error(error.response.data.error)
  }
}

export default getAllTripType
