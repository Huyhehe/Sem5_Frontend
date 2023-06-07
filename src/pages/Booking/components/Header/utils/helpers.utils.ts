import { useSearchParams } from "react-router-dom"

export const getAllQueryParams = () => {
  const [queryString] = useSearchParams()
  return queryString.entries()
}

export const getVndPrice = (price: number) => {
  const formatter = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  })

  return formatter.format(price)
}
