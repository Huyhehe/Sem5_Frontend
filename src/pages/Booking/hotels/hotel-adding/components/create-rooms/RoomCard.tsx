import ImageIcon from "@/components/common/ImageIcon"
import TypographyText from "@/components/common/TypographyText"
import TypographyTitle from "@/components/common/TypographyTitle"
import { HotelRoom } from "@/interfaces/hotel"
import { currencyFormatter, wordTransformByQuantity } from "@/utils/reusable"
import Divider from "antd/es/divider"
import Tooltip from "antd/es/tooltip"
import { AiFillDelete, AiFillEdit } from "react-icons/ai"

interface RoomCardProps {
  room: HotelRoom
  onEdit?: () => void
  onDelete?: () => void
  className?: string
}

const RoomCard = ({ room, onEdit, onDelete, className }: RoomCardProps) => {
  return (
    <div
      className={`w-full flex justify-between items-end rounded-md overflow-hidden gap-4 border border-gray-300/50 p-7 ${className}`}
    >
      <div className="w-full flex flex-col">
        <TypographyTitle
          level={3}
          text={`${room?.roomTypes?.[0]?.name} room`}
        />
        <div className="flex items-center gap-1">
          <ImageIcon
            icon={room?.roomBeds?.[0]?.bed?.icon}
            name={room?.roomBeds?.[0]?.bed?.type}
            className="w-6"
          />
          <TypographyText text={`x ${room?.roomBeds?.[0]?.numberOfBeds}`} />
          <Divider type="vertical" className="bg-black h-full" />
          <TypographyText
            className="font-bold"
            text={`VND ${currencyFormatter(room?.price)} / night`}
          />
        </div>
        <TypographyText
          className="font-black"
          text={`${room?.numberOfRooms} ${wordTransformByQuantity(
            "room",
            room?.numberOfRooms
          )}`}
        />
      </div>
      <div className="flex h-full">
        <Tooltip title="Delete">
          <AiFillDelete
            size={30}
            className="text-red-600 hover:text-primary cursor-pointer"
            onClick={() => onDelete?.()}
          />
        </Tooltip>
        <Tooltip title="Edit">
          <AiFillEdit
            size={30}
            className="text-blue-700 hover:text-secondary cursor-pointer"
            onClick={() => onEdit?.()}
          />
        </Tooltip>
      </div>
    </div>
  )
}

export default RoomCard
