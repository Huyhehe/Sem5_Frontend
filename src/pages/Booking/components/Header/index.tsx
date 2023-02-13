import { DateRagePicker } from "@/components/common/DateRagePicker"
import CustomDropdown from "@/components/common/Dropdown"
import TypographyTitle from "@/components/common/TypographyTitle"
import { Col, Row } from "antd"

interface HeaderProps {
  title?: string
}

const Header = ({ title = "" }: HeaderProps) => {
  return (
    <Row className="mb-8" justify="space-between">
      <Col span={6} className="bg-blue-400/20">
        Maps
      </Col>
      <Col span={17} className="flex flex-col gap-6">
        <Row>
          <TypographyTitle
            text={`${title} Hotels and Places to stay`}
            level={2}
          />
        </Row>
        <Row justify="space-between">
          <Col span={15}>
            <DateRagePicker size="large" className="w-full" />
          </Col>
          <Col span={8}>
            <CustomDropdown />
          </Col>
        </Row>
      </Col>
    </Row>
  )
}

export default Header