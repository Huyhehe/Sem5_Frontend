import Slide from "@/components/common/Slide"
import Card from "@/components/Card"
import { LocationsResponse } from "@/types/responses/location"
import { useEffect, useState } from "react"
import { getAllLocation } from "@/service/api/location"
import { useNavigate } from "react-router-dom"

const LocationSlide = () => {
  const [locations, setLocations] = useState<LocationsResponse>([])
  const navigator = useNavigate()

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const res = await getAllLocation()
        setLocations(res)
      } catch (error) {
        console.log(error)
      }
    }
    fetchLocations()
  }, [])
  return (
    <Slide>
      {locations?.map((item) => (
        <Card
          key={item.id}
          title={item.name}
          description={item.description || ""}
          price={0}
          rate={item.rating}
          img={item.locationImages?.[0]?.imageUrl}
          onClickFunc={() => navigator(`/search/${item.id}`)}
        />
      ))}
    </Slide>
  )
}

export default LocationSlide
