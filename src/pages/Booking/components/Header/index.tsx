import CustomDropdown from "@/components/common/CustomDropdown"
import { DateRagePicker } from "@/components/common/DateRagePicker"
import TypographyTitle from "@/components/common/TypographyTitle"
import { Col, Row } from "antd"
import Dayjs from "dayjs"
import type { Dayjs as DayjsType } from "dayjs"
import { useEffect, useState } from "react"
import HotelFilterDropdown from "./components/HotelFilterDropdown"
import { RangePickerTypes } from "@/utils/enum"

interface HeaderProps {
  title?: string
}

const Header = ({ title = "" }: HeaderProps) => {
  const [startDate, setStartDate] = useState<DayjsType>(Dayjs())
  const [endDate, setEndDate] = useState<DayjsType>(Dayjs().add(1, "day"))
  const [rangePickerType, setRangePickerType] = useState<RangePickerTypes>()

  useEffect(() => {
    if (
      Dayjs(startDate).isAfter(Dayjs(endDate)) ||
      Dayjs(startDate).isSame(Dayjs(endDate)) ||
      !endDate
    ) {
      setEndDate(Dayjs(startDate).add(1, "day"))
    }
  }, [startDate])

  useEffect(() => {
    if (
      Dayjs(startDate).isSame(Dayjs(endDate)) ||
      Dayjs(startDate).isAfter(Dayjs(endDate)) ||
      !startDate
    ) {
      setStartDate(Dayjs(endDate).subtract(1, "day"))
    }
  }, [endDate])
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
          <Col span={16}>
            <DateRagePicker
              size="large"
              className="w-full h-[3rem]"
              inputReadOnly
              allowClear={false}
              disabledDate={(date) => {
                if (rangePickerType === RangePickerTypes.START) {
                  return date.isBefore(new Date(), "day")
                } else if (rangePickerType === RangePickerTypes.END) {
                  if (startDate) {
                    return date.isBefore(new Date())
                  }
                }
                return date.isBefore(new Date(), "day")
              }}
              onCalendarChange={(dates, _, info) => {
                if (info.range === "start") {
                  setStartDate(Dayjs(dates?.[0]))
                }
                if (info.range === "end") {
                  setEndDate(Dayjs(dates?.[1]))
                }
              }}
              onFocus={(e) => {
                setRangePickerType(e.target.placeholder as RangePickerTypes)
              }}
              value={[startDate, endDate]}
            />
          </Col>
          <Col span={7}>
            <CustomDropdown Dropdown={HotelFilterDropdown} />
          </Col>
        </Row>
      </Col>
    </Row>
  )
}

export default Header
