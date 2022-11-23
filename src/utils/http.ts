import axiosInstance from "@/config/axiosConfig"

const API_URL = import.meta.env.VITE_API

export const getAllReview = async () => {
  try {
    const res = await axiosInstance.get(`${API_URL}/reviews`)
    return res.data
  } catch (error: any) {
    throw new Error(error)
  }
}
export const getReviewById = async (id: number) => {
  try {
    const res = await axiosInstance.get(`${API_URL}/reviews/${id}`)
    return res.data
  } catch (error: any) {
    throw new Error(error)
  }
}
export const signinAPI = async (user: {
  username: string
  password: string
}) => {
  try {
    const res = await axiosInstance.post(`${API_URL}/auth/login`, user)
    return res.data
  } catch (error: any) {
    throw new Error(error)
  }
}
export const forgotPasswordAPI = async (email: string) => {
  try {
    const res = await axiosInstance.post(
      `${API_URL}/auth/forgot-password`,
      email
    )
    return res.data
  } catch (error: any) {
    throw new Error(error)
  }
}
export const registerAPI = async (user: any) => {
  try {
    const res = await axiosInstance.post(`${API_URL}/auth/register`, user)
    return res.data
  } catch (error: any) {
    throw new Error(error)
  }
}
