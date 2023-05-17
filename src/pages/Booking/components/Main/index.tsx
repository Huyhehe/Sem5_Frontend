import { Hotel, hotelList } from "@/assets/data/hotel"
import Space from "antd/es/space"
import HotelCard from "./components/HotelCard"
import SkeletonHotelCard from "./components/SkeletonHotelCard"
import { useEffect, useState } from "react"

const MainContainer = () => {
  const [data, setData] = useState<Hotel[] | null>(null)
  useEffect(() => {
    setTimeout(() => {
      setData(hotelList)
    }, 3000)
  }, [])
  return (
    <Space direction="vertical" className="w-full" size={10}>
      {data ? (
        data.map((hotel, index) => {
          return <HotelCard key={index} {...hotel} />
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
