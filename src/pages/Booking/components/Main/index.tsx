import Space from "antd/es/space"
import HotelCard from "./components/HotelCard"
import SkeletonHotelCard from "./components/SkeletonHotelCard"
import { useEffect, useState } from "react"
import { getPagingHotel } from "@/service/api/hotel"
import { Hotel } from "@/interfaces/hotel"

const MainContainer = () => {
  const [hotels, setHotels] = useState<Hotel[]>([])
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await getPagingHotel()
        setHotels(data)
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
  }, [])

  return (
    <Space direction="vertical" className="w-full" size={10}>
      {hotels?.length ? (
        hotels.map((hotel, index) => {
          return <HotelCard key={index} hotel={hotel} />
        })
      ) : (
        <>
          <SkeletonHotelCard />
          <SkeletonHotelCard />
          <SkeletonHotelCard />
          <SkeletonHotelCard />
        </>
      )}
    </Space>
  )
}

export default MainContainer
