import useCoord from "@/hooks/useCoord"
import { mapBoxGlAPI } from "@/utils/constant"
import Map, { FullscreenControl, GeolocateControl, Marker } from "react-map-gl"

interface MapBoxProps {
  address: string
}

const MapBox = ({ address }: MapBoxProps) => {
  const [latitude, longitude] = useCoord(address)
  return (
    <Map
      initialViewState={{
        zoom: 13,
      }}
      latitude={latitude}
      longitude={longitude}
      mapStyle="mapbox://styles/mapbox/streets-v12"
      mapboxAccessToken={mapBoxGlAPI}
      scrollZoom
      doubleClickZoom
    >
      <Marker longitude={longitude} latitude={latitude} color="red" />
      <GeolocateControl />
      <FullscreenControl />
    </Map>
  )
}

export default MapBox
