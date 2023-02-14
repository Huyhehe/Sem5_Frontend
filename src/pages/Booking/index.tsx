import { Col, Row, Space } from "antd"
import { useSearchParams } from "react-router-dom"
import { default as HeaderContainer } from "./components/Header"

const Booking = () => {
  const [queryString] = useSearchParams()

  return (
    <Col span={24}>
      <HeaderContainer title={queryString.get("data")?.toString()} />
      <Row justify="space-between">
        <Col span={6} className="bg-black/25">
          <Space direction="vertical">Sider</Space>
        </Col>
        <Col span={17} className="bg-red-500/10">
          <Space direction="vertical" size={10}>
            Main
          </Space>
        </Col>
      </Row>
    </Col>
  )
}

export default Booking
