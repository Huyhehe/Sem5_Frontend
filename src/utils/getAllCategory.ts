import { getAllCategoryAPI } from "./http"

const getAllCategory = async (state: any, setState: any) => {
  try {
    const res = await getAllCategoryAPI()
    setState({
      ...state,
      categories: res,
    })
  } catch (error) {
    console.log(error)
  }
}
export default getAllCategory
