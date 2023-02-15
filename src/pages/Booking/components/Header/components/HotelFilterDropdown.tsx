import TypographyText from "@/components/common/TypographyText"
import TypographyTitle from "@/components/common/TypographyTitle"
import { HotelFilterTypes } from "@/utils/enum"
import { wordTransformByQuantity } from "@/utils/reusable"
import { Button, Dropdown, Space } from "antd"
import { MenuItemType } from "antd/es/menu/hooks/useItems"
import { useState } from "react"
import { IoBedOutline, IoClose, IoPeopleOutline } from "react-icons/io5"
import CountBox from "./CountBox"

interface IMenu extends Omit<MenuItemType, "key"> {
  value?: number
}

interface FilterState {
  room: number
  people: number
}

const HotelFilterDropdown = () => {
  const [hotelFilterState, setHotelFilterState] = useState<FilterState>({
    room: 0,
    people: 0,
  })
  const [hotelFilterConfirmState, setHotelFilterConfirmState] =
    useState<FilterState>(hotelFilterState)
  const [isOpen, setIsOpen] = useState(false)
  const { room, people } = hotelFilterState

  const menu: IMenu[] = [
    {
      label: HotelFilterTypes.ROOM,
      value: room,
      icon: <IoBedOutline size={25} />,
    },
    {
      label: HotelFilterTypes.PEOPLE,
      value: people,
      icon: <IoPeopleOutline size={25} />,
    },
  ]

  const handleUpdateFilter = () => {
    setIsOpen(false)
    setHotelFilterConfirmState(hotelFilterState)
  }

  const handleCancelFilter = () => {
    setIsOpen(false)
    setHotelFilterState(hotelFilterConfirmState)
  }

  return (
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
            {menu.map((item: IMenu, index) => {
              return (
                <CountBox<FilterState>
                  key={index}
                  label={item.label as string}
                  icon={item.icon}
                  parentState={item.value}
                  setParentState={setHotelFilterState}
                />
              )
            })}
            <Button
              className="text-white border-none rounded-[5px]"
              onClick={handleUpdateFilter}
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
            text={`${hotelFilterConfirmState.room} ${wordTransformByQuantity(
              HotelFilterTypes.ROOM,
              hotelFilterConfirmState.room
            )}, ${hotelFilterConfirmState.people} ${wordTransformByQuantity(
              HotelFilterTypes.PEOPLE,
              hotelFilterConfirmState.people
            )}`}
          />
        </Space.Compact>
      </Space.Compact>
    </Dropdown>
  )
}

export default HotelFilterDropdown
