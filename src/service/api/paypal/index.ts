import axiosInstance from "@/service/axiosInstance"

export type CreateOrderData = {
  rooms: {
    roomId: string
    numberOfRooms: number
  }[]

  checkIn: string
  checkOut: string
  customerName: string
}
export type CreateOrderResponse = {
  id: string
  status: string
  links: {
    href: string
    rel: string
    method: string
  }[]
}

export const requestCreateOrder = async (
  request: CreateOrderData
): Promise<CreateOrderResponse> => {
  try {
    const { data } = await axiosInstance.post(
      "/paypal/create-paypal-order",
      request
    )
    return data
  } catch (error: any) {
    throw new Error(error.response.data.message)
  }
}

export const captureOrder = async (orderId: string) => {
  try {
    const { data } = await axiosInstance.post(
      `/paypal/capture-paypal-order/${orderId}`
    )
    return data
  } catch (error: any) {
    throw new Error(error.response.data.message)
  }
}

export const cancelOrder = async (captureId: string) => {
  try {
    const { data } = await axiosInstance.post(
      `/paypal/refund-captured-payment/${captureId}`
    )
    return data
  } catch (error: any) {
    throw new Error(error.response.data.message)
  }
}
