import { googleMapAPI } from "@/utils/constant"
import { GoogleMap, MarkerF, useLoadScript } from "@react-google-maps/api"
import { useEffect, useState } from "react"
import { geocodeByAddress, getLatLng } from "react-google-places-autocomplete"

const containerStyle = {
  width: "100%",
  height: "100%",
}

const defaultCenter = {
  lat: 0,
  lng: 0,
}

interface MapProps {
  address: string
}

const Map = ({ address }: MapProps) => {
  const [coord, setCoord] = useState(defaultCenter)
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: googleMapAPI,
    libraries: ["places"],
  })

  const handleGetCoord = async (address: string) => {
    const results = await geocodeByAddress(address)
    const latLng = await getLatLng(results[0])
    setCoord(latLng)
  }

  useEffect(() => {
    handleGetCoord(address)
  }, [address])

  if (loadError) return <p>Error loading maps</p>
  if (!isLoaded) return <p>Loading Maps...</p>
  return (
    <GoogleMap mapContainerStyle={containerStyle} center={coord} zoom={15}>
      <MarkerF position={coord} />
    </GoogleMap>
  )
}

export default Map
