import { mapBoxGlAPI } from "@/utils/constant"
import { useEffect, useState } from "react"

const useCoord = (address: string) => {
  const [coord, setCoord] = useState({
    latitude: 0,
    longitude: 0,
  })

  const getCoord = async (address: string) => {
    const response = await fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
        address
      )}.json?access_token=${mapBoxGlAPI}`
    )
    const data = await response.json()
    const { center } = data.features[0]
    const [longitude, latitude] = center
    setCoord({ latitude, longitude })
  }

  useEffect(() => {
    getCoord(address)
  }, [address])

  const { latitude, longitude } = coord

  return [latitude, longitude]
}

export default useCoord
