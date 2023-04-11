import { Col, Row, Space } from "antd"
import { useSearchParams } from "react-router-dom"
import { default as HeaderContainer } from "./components/Header"
import MainContainer from "./components/Main"
import { hotelList } from "@/assets/data/hotel"

const Booking = () => {
  document.title = "TravelCare | Booking"
  const [queryString] = useSearchParams()

  return (
    <Col span={24}>
      <HeaderContainer title={queryString.get("location")?.toString()} />
      <Row justify="space-between">
        <Col span={6} className="bg-black/25">
          <Space direction="vertical">Sider</Space>
        </Col>
        <Col span={17}>
          <MainContainer data={hotelList} />
        </Col>
      </Row>
    </Col>
  )
}

export default Booking
