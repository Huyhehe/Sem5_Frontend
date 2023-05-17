import { getGeocodeAutoCompleteAPI } from "@/utils/http"
import { useEffect, useState } from "react"

const useCoord = (address: string) => {
  const [coord, setCoord] = useState({
    latitude: 0,
    longitude: 0,
  })

  const getCoord = async (address: string) => {
    const response = await getGeocodeAutoCompleteAPI(address)
    const { lon: longitude, lat: latitude } = response.results?.[0]
    setCoord({ latitude, longitude })
  }

  useEffect(() => {
    getCoord(address)
  }, [address])

  const { latitude, longitude } = coord

  return [latitude, longitude]
}

export default useCoord
