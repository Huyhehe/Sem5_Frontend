import TypographyText from "@/components/common/TypographyText"
import TypographyTitle from "@/components/common/TypographyTitle"
import { HotelFilterTypes } from "@/utils/enum"
import { wordTransformByQuantity } from "@/utils/reusable"
import { Button, Dropdown, Space } from "antd"
import { useFormik } from "formik"
import { useState } from "react"
import { IoBedOutline, IoClose, IoPeopleOutline } from "react-icons/io5"
import CountBox from "./CountBox"

interface FilterState {
  room: number
  person: number
}

const HotelFilterDropdown = () => {
  const [hotelFilterState, setHotelFilterState] = useState<FilterState>({
    room: 1,
    person: 1,
  })
  const [isOpen, setIsOpen] = useState(false)
  const { room, person } = hotelFilterState

  const handleCancelFilter = () => {
    setIsOpen(false)
    resetForm({
      values: hotelFilterState,
    })
  }

  const handleChange = (name: string, value: number) => {
    setFieldValue(name, value)
  }

  const { values, setFieldValue, handleSubmit, resetForm } = useFormik({
    initialValues: hotelFilterState,
    onSubmit: (values) => {
      setIsOpen(false)
      setHotelFilterState(values)
    },
  })

  return (
    <form className="h-full">
      <Dropdown
        onOpenChange={(e) => {
          !e && handleCancelFilter()
        }}
        placement="bottom"
        className="h-full cursor-pointer"
        trigger={["click"]}
        open={isOpen}
        dropdownRender={() => {
          return (
            <Space.Compact
              block
              direction="vertical"
              className="bg-white w-full shadow-lg p-4 gap-4"
            >
              <IoClose
                size={30}
                className="ml-auto cursor-pointer hover:rotate-90"
                onClick={handleCancelFilter}
              />
              <CountBox
                onChange={(value) => handleChange(HotelFilterTypes.ROOM, value)}
                label={HotelFilterTypes.ROOM}
                icon={<IoBedOutline size={25} />}
                value={values.room}
                min={1}
              />
              <CountBox
                onChange={(value) =>
                  handleChange(HotelFilterTypes.PERSON, value)
                }
                label={HotelFilterTypes.PERSON}
                icon={<IoPeopleOutline size={25} />}
                value={values.person}
                min={1}
              />
              <Button
                className="text-white border-none rounded-[5px] bg-black"
                onClick={() => handleSubmit()}
              >
                Update
              </Button>
            </Space.Compact>
          )
        }}
      >
        <Space.Compact
          block
          className="items-center gap-2 px-2 border-2 hover:border-black rounded-md"
          onClick={() => setIsOpen(!isOpen)}
        >
          <IoPeopleOutline size={30} />
          <Space.Compact block direction="vertical">
            <TypographyText
              text="Guest"
              className="text-[0.65rem] text-gray-400"
            />
            <TypographyTitle
              className="leading-4"
              level={5}
              text={`${room} ${wordTransformByQuantity(
                HotelFilterTypes.ROOM,
                room
              )}, ${person} ${wordTransformByQuantity(
                HotelFilterTypes.PERSON,
                person
              )}`}
            />
          </Space.Compact>
        </Space.Compact>
      </Dropdown>
    </form>
  )
}

export default HotelFilterDropdown
