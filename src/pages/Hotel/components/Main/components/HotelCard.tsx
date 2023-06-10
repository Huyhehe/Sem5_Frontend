import dayjs from "dayjs"
import TypographyText from "@/components/common/TypographyText"
import TypographyTitle from "@/components/common/TypographyTitle"
import { Hotel } from "@/interfaces/hotel"
import { wordTransformByQuantity } from "@/utils/reusable"
import { Button, Divider, Image, Rate, Space } from "antd"
import { FaStar } from "react-icons/fa"
import { shortenAmenities } from "../utils"
import ImageIcon from "@/components/common/ImageIcon"
import { useNavigate } from "react-router-dom"

type HotelCardProps = {
  hotel: Hotel
}

const HotelCard = ({
  hotel: {
    id,
    location: { name: hotelName, locationImages, reviewCount },
    hotelClass,
    propertyAmenities,
  },
}: HotelCardProps) => {
  const navigator = useNavigate()
  return (
    <Space.Compact
      block
      className="rounded-md overflow-hidden gap-4 border border-gray-300/50"
    >
      <Image
        src={locationImages?.[0]?.imageUrl}
        preview={false}
        alt={"hotel"}
        width={300}
        height={250}
      />
      <div className="flex flex-grow flex-col gap-4 py-4">
        <TypographyTitle text={hotelName} level={3} className="color-primary" />
        <div className="flex flex-grow gap-2">
          <div className="flex flex-col items-center justify-center">
            <Button
              type="primary"
              size="large"
              className="w-full rounded-md bg-secondary hover:bg-secondary/80"
              onClick={() => {
                navigator(
                  `/hotel-booking/${id}?start=${dayjs()
                    .add(1, "day")
                    .format("YYYY-MM-DD")}&end=${dayjs()
                    .add(2, "day")
                    .format("YYYY-MM-DD")}&room=1&person=2`
                )
              }}
            >
              Show Prices
            </Button>
            <TypographyText
              text="Enter dates to see prices"
              className="text-gray-400 font-thin"
            />
          </div>
          <Divider type="vertical" className="h-full" />
          <div className="flex flex-col px-6 gap-2">
            <div className="flex items-center gap-2">
              <Rate
                className="text-yellow-400 flex"
                allowHalf
                value={hotelClass}
                character={<FaStar />}
                disabled
              />
              <TypographyText
                text={wordTransformByQuantity(
                  `${reviewCount} review`,
                  reviewCount
                )}
                className="text-gray-400"
              />
            </div>
            <div className="flex flex-col">
              {shortenAmenities(propertyAmenities, 5)?.map(
                (propertyAmenity) => {
                  const { id, name, icon } = propertyAmenity
                  return (
                    <div key={id} className="flex gap-1 items-center">
                      {icon && <ImageIcon icon={icon} className="w-4" />}
                      <TypographyText text={name} className="text-gray-500" />
                    </div>
                  )
                }
              )}
            </div>
          </div>
        </div>
      </div>
    </Space.Compact>
  )
}

export default HotelCard
