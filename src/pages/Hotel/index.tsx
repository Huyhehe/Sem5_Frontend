import { Col, Row, Space } from "antd"
import { default as HeaderContainer } from "./components/Header"
import MainContainer from "./components/Main"

const Booking = () => {
  document.title = "TravelCare | Hotel"

  return (
    <Col span={24}>
      <HeaderContainer />
      <Row justify="space-between">
        {/* <Col span={6} className="bg-black/25">
          <Space direction="vertical">Sider</Space>
        </Col> */}
        <Col span={24}>
          <MainContainer />
        </Col>
      </Row>
    </Col>
  )
}

export default Booking
