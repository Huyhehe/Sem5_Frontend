import { Hotel } from "@/interfaces/hotel"
import { getPagingHotel } from "@/service/api/hotel"
import Space from "antd/es/space"
import { useEffect, useState } from "react"
import HotelCard from "./components/HotelCard"
import SkeletonHotelCard from "./components/SkeletonHotelCard"
import { useSearchParams } from "react-router-dom"
import { Empty } from "antd"

const MainContainer = () => {
  const [hotels, setHotels] = useState<Hotel[]>([])
  const [queryString] = useSearchParams()
  const [timeoutState, setTimeoutState] = useState(false)
  const { location, start, end, room, person } = Object.fromEntries(
    queryString.entries()
  )
  const fetchData = async () => {
    try {
      if (location) {
        const { data } = await getPagingHotel({
          search: location,
          checkIn: start,
          checkOut: end,
          sleeps: Number(person),
          numberOfRooms: Number(room),
        })
        setHotels(data)
      } else {
        const { data } = await getPagingHotel()
        setHotels(data)
      }
    } catch (error) {
      setTimeout(() => {
        setTimeoutState(true)
      }, 5000)
      console.log(error)
    }
  }
  useEffect(() => {
    fetchData()
  }, [queryString])

  return (
    <Space direction="vertical" className="w-full" size={10}>
      {hotels?.length ? (
        hotels.map((hotel, index) => {
          return <HotelCard key={index} hotel={hotel} />
        })
      ) : !hotels?.length && timeoutState ? (
        <>
          <SkeletonHotelCard />
          <SkeletonHotelCard />
          <SkeletonHotelCard />
          <SkeletonHotelCard />
        </>
      ) : (
        <Empty />
      )}
    </Space>
  )
}

export default MainContainer
