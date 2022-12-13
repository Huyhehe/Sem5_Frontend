import { getAllCategoryAPI } from "./http"

const getAllCategory = async (state: any, setState: any) => {
  try {
    const res = await getAllCategoryAPI()
    const options = res.map((item: any) => ({
      value: item.id,
      label: item.name,
    }))
    setState({
      ...state,
      categories: options,
    })
  } catch (error) {
    console.log(error)
  }
}
export default getAllCategory
