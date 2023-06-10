import { useSearchParams } from "react-router-dom"

export const getAllQueryParams = () => {
  const [queryString] = useSearchParams()
  return queryString.entries()
}
