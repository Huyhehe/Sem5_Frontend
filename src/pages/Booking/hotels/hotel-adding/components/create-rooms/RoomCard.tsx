import TypographyTitle from "@/components/common/TypographyTitle"
import { HotelRoom } from "@/interfaces/hotel"
import { Tooltip } from "antd"
import { AiFillDelete, AiFillEdit } from "react-icons/ai"

interface RoomCardProps {
  room: HotelRoom
}

const RoomCard = ({ room }: RoomCardProps) => {
  return (
    <div className="w-full flex justify-between rounded-md overflow-hidden gap-4 border border-gray-300/50 p-7">
      <TypographyTitle
        level={3}
        text={`${room?.roomTypes?.[0]?.name} room with 2 beds`}
      />
      <div className="flex h-full">
        <Tooltip title="Delete">
          <AiFillDelete
            size={30}
            className="text-red-600 hover:text-primary cursor-pointer"
          />
        </Tooltip>
        <Tooltip title="Edit">
          <AiFillEdit
            size={30}
            className="text-blue-700 hover:text-secondary cursor-pointer"
          />
        </Tooltip>
      </div>
    </div>
  )
}

export default RoomCard
