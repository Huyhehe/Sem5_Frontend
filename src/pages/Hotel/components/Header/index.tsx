import { DateRagePicker } from "@/components/common/DateRagePicker"
import MapBox from "@/components/common/MapBox"
import TypographyTitle from "@/components/common/TypographyTitle"
import { RangePickerTypes } from "@/utils/enum"
import { getGeocodeAutoCompleteAPI } from "@/utils/http"
import { AutoComplete, Col, Input, Row } from "antd"
import type { Dayjs as DayjsType } from "dayjs"
import Dayjs from "dayjs"
import { useFormik } from "formik"
import { useEffect, useState } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import "../../styles.css"
import HotelFilterDropdown from "./components/HotelFilterDropdown"

const Header = () => {
  const navigator = useNavigate()
  const [searchParams] = useSearchParams()
  const { location, start, end, room, person } = Object.fromEntries(
    searchParams.entries()
  )
  const [startDate, setStartDate] = useState<DayjsType>(Dayjs(start))
  const [endDate, setEndDate] = useState<DayjsType>(
    end ? Dayjs(end) : Dayjs(start).add(1, "day")
  )
  const [rangePickerType, setRangePickerType] = useState<RangePickerTypes>()
  const [locationOptions, setLocationOptions] = useState<
    { value: string; label: string }[]
  >([])
  const { values, setFieldValue, handleSubmit } = useFormik({
    initialValues: {
      room: room || 1,
      person: person || 2,
      dayRange: [startDate, endDate],
      location: location || "",
    },
    onSubmit: (values) => {
      navigator(
        `/hotels?location=${values.location}&start=${values.dayRange[0].format(
          "YYYY-MM-DD"
        )}&end=${values.dayRange[1].format("YYYY-MM-DD")}&room=${
          values.room
        }&person=${values.person}`
      )
    },
  })

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

  useEffect(() => {
    const timeout = setTimeout(async () => {
      try {
        const res = await getGeocodeAutoCompleteAPI(values.location)
        const options = res.results?.map((result) => ({
          value: result.city,
          label: result.city,
        }))
        setLocationOptions(options || [])
      } catch (error) {
        console.log(error)
      }
    }, 500)

    return () => clearTimeout(timeout)
  }, [values.location])

  return (
    <Row className="mb-8 min-h-[12.5vh]" justify="space-between">
      <Col span={6} className="bg-blue-400/20">
        <MapBox address={location} />
      </Col>
      <Col span={17} className="flex flex-col gap-6">
        <Row>
          <TypographyTitle
            text={`Hotels and Places to stay ${
              location ? `in ${location}` : ""
            }`}
            level={2}
          />
        </Row>
        <form>
          <Row justify="space-between">
            <Col span={10}>
              <AutoComplete
                className="w-full h-full"
                onChange={(value) => {
                  setFieldValue("location", value)
                }}
                value={values.location}
                options={locationOptions}
                onSelect={(value) => {
                  setFieldValue("location", value)
                  handleSubmit()
                }}
              >
                <Input
                  className="w-full h-full text-xl border-[2px] focus:border-black shadow-none hover:border-black"
                  placeholder="Where to stay?"
                />
              </AutoComplete>
            </Col>
            <Col span={7}>
              <DateRagePicker
                name="dayRange"
                size="large"
                className="w-full h-[3rem] cursor-pointer border-[2px] hover:border-black"
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
                    setFieldValue("dayRange", [Dayjs(dates?.[0]), endDate])
                  }
                  if (info.range === "end") {
                    setEndDate(Dayjs(dates?.[1]))
                    setFieldValue("dayRange", [startDate, Dayjs(dates?.[1])])
                  }
                  handleSubmit()
                }}
                onFocus={(e) => {
                  setRangePickerType(e.target.placeholder as RangePickerTypes)
                }}
                value={[startDate, endDate]}
              />
            </Col>
            <Col span={6}>
              <HotelFilterDropdown
                room={Number(room)}
                person={Number(person)}
                onUpdate={(value) => {
                  setFieldValue("room", value.room)
                  setFieldValue("person", value.person)
                  handleSubmit()
                }}
              />
            </Col>
          </Row>
        </form>
      </Col>
    </Row>
  )
}

export default Header
