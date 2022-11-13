import axios from "axios"

const API_URL = import.meta.env.VITE_API

export const getAllReview = async () => {
  try {
    const res = await axios.get(`${API_URL}/reviews`)
    return res.data
  } catch (error) {
    return error
  }
}
export const getReviewById = async (id: number) => {
  try {
    const res = await axios.get(`${API_URL}/reviews/${id}`)
    return res.data
  } catch (error) {
    return error
  }
}
