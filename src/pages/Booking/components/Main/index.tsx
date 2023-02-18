import { Hotel } from "@/assets/data/hotel"
import { Space } from "antd"
import HotelCard from "./components/HotelCard"

interface MainContainerProps {
  data: Hotel[]
}

const MainContainer = ({ data }: MainContainerProps) => {
  return (
    <Space direction="vertical" className="w-full" size={10}>
      {data?.map((hotel: Hotel, index) => {
        return <HotelCard key={index} {...hotel} />
      })}
    </Space>
  )
}

export default MainContainer
