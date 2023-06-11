import TypographyTitle from "@/components/common/TypographyTitle"
import { Hotel, HotelRoom } from "@/interfaces/hotel"
import { MdOutlineFreeBreakfast } from "react-icons/md"
import { AiOutlineCheckCircle } from "react-icons/ai"
import Tooltip from "antd/es/tooltip"
import Input from "antd/es/input"
import GuestQuantity from "@/components/common/GuestQuantity"
import useUser from "@/hooks/useUser"

interface CheckoutRoomCardProps {
  room: HotelRoom
  hotel: Hotel
}

const CheckoutRoomCard = ({ room, hotel }: CheckoutRoomCardProps) => {
  const userInfo = useUser()
  return (
    <div className="flex flex-col gap-4 p-4 rounded-lg border">
      <TypographyTitle level={3} text={`${room.roomTypes?.[0]?.name} Room`} />
      <div className="flex flex-col">
        {room?.isFreeCancellation && (
          <div className="flex items-center gap-2 text-dollar">
            <AiOutlineCheckCircle size={20} />
            <span className="text-sm">Free cancelling</span>
          </div>
        )}
        {hotel?.propertyAmenities?.some(
          (amenity) => amenity.id === "a876eb4e-9d71-477f-9997-d4b06f957ad9"
        ) && (
          <div className="flex items-center gap-2 text-dollar">
            <MdOutlineFreeBreakfast size={20} />
            <span className="text-sm">
              Free breakfast included in the price
            </span>
          </div>
        )}
      </div>
      <div className="flex flex-wrap gap-2">
        {room?.roomFeatures?.map((feature) => {
          return (
            <Tooltip
              key={feature.id}
              title={feature.name}
              className="flex items-center gap-1 p-1 text-dollar border border-dollar rounded-lg"
            >
              <img src={feature.icon} className="w-5" />
              <span className="text-[0.825rem]">{feature.name}</span>
            </Tooltip>
          )
        })}
      </div>
      <div className="flex items-center gap-1">
        {"Max people:"}
        <GuestQuantity quantity={room?.sleeps} />
      </div>
      <div className="flex flex-col w-[70%] gap-2">
        <TypographyTitle level={4} text="Full guest name" />
        <Input
          value={`${userInfo?.firstName} ${userInfo?.lastName}`}
          disabled
        />
      </div>
    </div>
  )
}

export default CheckoutRoomCard
