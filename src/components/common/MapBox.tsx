import useCoord from "@/hooks/useCoord"
import { mapBoxGlAPI } from "@/utils/constant"
import { useEffect, useState } from "react"
import Map, {
  FullscreenControl,
  GeolocateControl,
  Marker,
  ViewState,
} from "react-map-gl"

interface MapBoxProps {
  address: string
}

const MapBox = ({ address }: MapBoxProps) => {
  const [latitude, longitude] = useCoord(address)
  const [viewport, setViewport] = useState({
    width: "100%",
    height: "100%",
    latitude,
    longitude,
    zoom: 13,
  })

  useEffect(() => {
    setViewport({
      ...viewport,
      latitude,
      longitude,
    })
  }, [latitude, longitude])

  const handleOnMove = (viewState: ViewState) => {
    setViewport((prev) => {
      return {
        ...prev,
        ...viewState,
      }
    })
  }

  return (
    <Map
      {...viewport}
      mapStyle="mapbox://styles/mapbox/streets-v12"
      mapboxAccessToken={mapBoxGlAPI}
      scrollZoom
      doubleClickZoom
      onMove={({ viewState }) => {
        handleOnMove(viewState)
      }}
    >
      <Marker longitude={longitude} latitude={latitude} color="red" />
      <GeolocateControl />
      <FullscreenControl />
    </Map>
  )
}

export default MapBox
