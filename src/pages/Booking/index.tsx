import { hotelList } from "@/assets/data/hotel"
import { Col, Row, Space } from "antd"
import { default as HeaderContainer } from "./components/Header"
import MainContainer from "./components/Main"

const Booking = () => {
  document.title = "TravelCare | Booking"

  return (
    <Col span={24}>
      <HeaderContainer />
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
