import Slide from "@/components/common/Slide"
import Card from "@/components/card/Card"
import { LocationsResponseData } from "@/types/responses/location"
import { useEffect, useState } from "react"
import { getAllLocation } from "@/service/api/location"
import { useNavigate } from "react-router-dom"
import SkeletonCard from "@/components/card/SkeletonCard"

const LocationSlide = () => {
  const [locations, setLocations] = useState<LocationsResponseData>([])
  const navigator = useNavigate()

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const { data } = await getAllLocation()
        setLocations(data)
      } catch (error) {
        console.log(error)
      }
    }
    fetchLocations()
  }, [])
  return (
    <Slide>
      {locations.length > 0
        ? locations?.map((item) => (
            <Card
              key={item.id}
              title={item.name}
              description={item.description || ""}
              price={0}
              rate={item.rating}
              img={item.locationImages?.[0]?.imageUrl}
              onClickFunc={() => navigator(`/search/${item.id}`)}
            />
          ))
        : [1, 2, 3, 4].map((item) => {
            return <SkeletonCard key={item} />
          })}
    </Slide>
  )
}

export default LocationSlide
