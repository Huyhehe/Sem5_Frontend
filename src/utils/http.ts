import axios from "axios"
import axiosInstance, { setTokenInterceptor } from "@/service/axiosInstance"
import { setAccessTokenToLocal, setRefreshTokenToLocal } from "./localStorage"
import { autofillAPI } from "./constant"
import { GeocodeAutocompleteResponse } from "@/types/responses"
import { IHotelBooking } from "@/types/responses/hotel/hotelBooking.res.type"

const API_URL = import.meta.env.VITE_API
// AUTH
export const signInAPI = async (user: {
  username: string
  password: string
}) => {
  try {
    const res = await axiosInstance.post(`/auth/login/`, user)
    setTokenInterceptor(res.data.tokens.accessToken)
    setAccessTokenToLocal(res.data.tokens.accessToken)
    setRefreshTokenToLocal(res.data.tokens.refreshToken)
    return res.data
  } catch (error: any) {
    throw new Error(error.response.data.message)
  }
}

export const signOutAPI = async (refreshToken: string) => {
  try {
    const res = await axiosInstance.post(`/auth/logout/`, {
      refresh: refreshToken,
    })
    setTokenInterceptor(null)
    return res.data
  } catch (error: any) {
    throw new Error(error.response.data.message)
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
    throw new Error(error.response.data.message)
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
export const getAccount = async () => {
  try {
    const { data } = await axiosInstance.get(`${API_URL}/user/`)
    return data
  } catch (error: any) {
    throw new Error(error.response.data.message)
  }
}
export const getUserAPI = async (id: string) => {
  try {
    const res = await axiosInstance.get(`/users/get-user/${id}`)
    return res.data
  } catch (error: any) {
    throw new Error(error.response.data.messages[0].message)
  }
}
export const updateProfileImageAPI = async (formData: FormData) => {
  try {
    const res = await axiosInstance.patch(
      `/user/update-profile-image/`,
      formData
    )
    return res.data
  } catch (error: any) {
    throw new Error(error.response.data.message)
  }
}
export const updateCoverImageAPI = async (formData: FormData) => {
  try {
    const res = await axiosInstance.patch(`/user/update-cover-image/`, formData)
    return res.data
  } catch (error: any) {
    throw new Error(error.response.data.message)
  }
}
export const updateProfileInfoAPI = async (data: any) => {
  try {
    const res = await axiosInstance.put(`${API_URL}/users/update-user/`, data)
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
export const getAllCountryAPI = async () => {
  try {
    const res = await axiosInstance.get(`/address/get-all-country/`)
    return res.data
  } catch (error: any) {
    throw new Error(error.response.data.messages[0].message)
  }
}
export const getAllProvinceAPI = async (country_id: string) => {
  try {
    const res = await axiosInstance.get(
      `/address/get-list-province/${country_id}`
    )
    return res.data
  } catch (error: any) {
    throw new Error(error.response.data.messages[0].message)
  }
}
export const getAllDistrictAPI = async (province_id: string) => {
  try {
    const res = await axiosInstance.get(
      `/address/get-list-district/${province_id}`
    )
    return res.data
  } catch (error: any) {
    throw new Error(error.response.data.messages[0].message)
  }
}

// LOCATION
export const createLocationAPI = async (data: any) => {
  try {
    const res = await axiosInstance.post("/locations/", data)
    return res.data
  } catch (error: any) {
    throw new Error(error.response.data.messages[0].message)
  }
}

export const getAllCategoryAPI = async () => {
  try {
    const res = await axiosInstance.get(`/categories`)
    return res.data
  } catch (error: any) {
    throw new Error(error.response.data.message)
  }
}

export const getAllImageByLocationIdAPI = async (id: string) => {
  try {
    const res = await axios.get(`${API_URL}/locations/get-images/${id}`)
    return res.data
  } catch (error: any) {
    throw new Error(error.response.data.messages[0].message)
  }
}

// LOCATION REVIEW
export const getAllLocationReviews = async () => {
  try {
    const res = await axios.get(`${API_URL}/locations/get-all-location/`)
    return res.data
  } catch (error: any) {
    throw new Error(error.response.data.error)
  }
}
export const getLocationReviewById = async (id: string) => {
  try {
    const res = await axios.get(`${API_URL}/locations/get-location/${id}`)
    return res.data
  } catch (error: any) {
    throw new Error(error.response.data.error)
  }
}
// USER REVIEW
export const getAllUserReviewsByLocationId = async (id: string) => {
  try {
    const res = await axios.get(
      `${API_URL}/reviews/get-reviews-by-location/${id}`
    )
    return res.data
  } catch (error: any) {
    throw new Error(error.response.data.error)
  }
}

export const getAllReviewByUserIdAPI = async (id: string) => {
  try {
    const res = await axiosInstance.get(
      `${API_URL}/reviews/get-reviews-by-user/${id}`
    )
    return res.data
  } catch (error: any) {
    throw new Error(error.response.data.error)
  }
}
export const getAllTripTypeAPI = async () => {
  try {
    const res = await axiosInstance.get(`${API_URL}/reviews/get-all-trip-type/`)
    return res.data
  } catch (error: any) {
    throw new Error(error.response.data.error)
  }
}
export const createUserReviewAPI = async (data: any) => {
  try {
    const res = await axiosInstance.post(
      `${API_URL}/reviews/create-review/`,
      data
    )
    return res.data
  } catch (error: any) {
    throw new Error(error.response.data.error)
  }
}
export const createImageReviewAPI = async (data: any) => {
  try {
    const res = await axiosInstance.post(
      `${API_URL}/reviews/create-image/`,
      data
    )
    return res.data
  } catch (error: any) {
    throw new Error(error.response.data.error)
  }
}

export const updateReviewAPI = async (data: any) => {
  try {
    const res = await axiosInstance.patch(
      `${API_URL}/review/update-review/`,
      data
    )
    return res.data
  } catch (error: any) {
    throw new Error(error.response.data.error)
  }
}

export const deleteReviewAPI = async (id: string) => {
  try {
    const res = await axiosInstance.delete(
      `${API_URL}/reviews/delete-review/${id}`
    )
    return res.data
  } catch (error: any) {
    throw new Error(error.response.data.error)
  }
}

export const getGeocodeAutoCompleteAPI = async (
  location: string
): Promise<GeocodeAutocompleteResponse> => {
  try {
    const res = await axios.get(
      `https://api.geoapify.com/v1/geocode/autocomplete?text=${encodeURIComponent(
        location
      )}&format=json&apiKey=${autofillAPI}&lang=vi`
    )
    return res.data
  } catch (error: any) {
    throw new Error(error)
  }
}

export const getHotelBookingById = async (
  id: string
): Promise<IHotelBooking> => {
  try {
    const res = await axiosInstance.get(`${API_URL}/hotels/${id}`)
    return res.data
  } catch (error: any) {
    throw new Error(error)
  }
}
