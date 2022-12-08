import axios from "axios"

const API_URL = import.meta.env.VITE_API
let axiosInstance: any = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
    common: {
      Authorization: `Bearer ${JSON.parse(
        localStorage.getItem("accessToken") as string
      )}`,
    },
  },
})

// AUTH
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
    axiosInstance = axios.create({
      baseURL: API_URL,
      headers: {
        "Content-Type": "application/json",
        common: {
          Authorization: `Bearer ${res.data.access_token}`,
        },
      },
    })
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
    throw new Error(error.response.data.email[0])
  }
}
export const verifyEmailAPI = async (token: string) => {
  try {
    const res = await axios.get(`${API_URL}/auth/email-verify/${token}`)
    return res.data
  } catch (error: any) {
    throw new Error(error.response.data.error || error.message)
  }
}

// USER
export const getUserAPI = async (id: string) => {
  try {
    const res = await axiosInstance.get(`/users/get-user/${id}`)
    return res.data
  } catch (error: any) {
    throw new Error(error.response.data.messages[0].message)
  }
}

// ADDRESS
export const getFullAddressAPI = async ({
  country,
  province,
  district,
}: {
  country: string
  province: string
  district: string
}) => {
  try {
    const res = await axiosInstance.get(
      `/address/get-list-address/${country}/${province}/${district}/`
    )
    return res.data
  } catch (error: any) {
    throw new Error(error.response.data.messages[0].message)
  }
}
