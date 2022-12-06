import axiosInstance from "@/config/axiosConfig"
import axios from "axios"

const API_URL = import.meta.env.VITE_API

export const getAllLocationReviews = async () => {
  try {
    const res = await axiosInstance.get(`${API_URL}/reviews`)
    return res.data
  } catch (error: any) {
    throw new Error(error.response.data.error)
  }
}
export const getLocationReviewById = async (id: number) => {
  try {
    const res = await axiosInstance.get(`${API_URL}/reviews/${id}`)
    return res.data
  } catch (error: any) {
    throw new Error(error.response.data.error)
  }
}
export const signInAPI = async (user: { email: string; password: string }) => {
  try {
    const res = await axios.post(`${API_URL}/auth/login/`, user)
    return res.data
  } catch (error: any) {
    throw new Error(error.response.data.error)
  }
}
export const signOutAPI = async () => {
  try {
    const res = await axiosInstance.post(`${API_URL}/auth/logout`)
    return res.data
  } catch (error: any) {
    throw new Error(error.response.data.error)
  }
}
export const forgotPasswordAPI = async (email: string) => {
  try {
    const res = await axios.post(`${API_URL}/auth/forgot-password`, email)
    return res.data
  } catch (error: any) {
    throw new Error(error.response.data.error)
  }
}
export const registerAPI = async (user: any) => {
  try {
    const res = await axios.post(`${API_URL}/auth/register/`, user)
    return res.data
  } catch (error: any) {
    throw new Error(error.response.data.error)
  }
}
export const verifyEmailAPI = async (token: string) => {
  try {
    const res = await axios.get(`${API_URL}/auth/email-verify/${token}`)
    return res.data
  } catch (error: any) {
    throw new Error(error.response.data.error)
  }
}

// export const verifyAPI = async (code: string) => {
//   try {
//     const response =
//   } catch (error: any) {
//     throw new Error(error)
//   }
// }
