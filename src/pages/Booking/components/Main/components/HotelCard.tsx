import { Hotel } from "@/assets/data/hotel"
import { hotel } from "@/assets/images"
import FavouriteIcon from "@/components/common/FavouriteIcon"
import TypographyText from "@/components/common/TypographyText"
import TypographyTitle from "@/components/common/TypographyTitle"
import { wordTransformByQuantity } from "@/utils/reusable"
import { Button, Divider, Image, Rate, Space } from "antd"
import { useState } from "react"
import { FaStar } from "react-icons/fa"

interface HotelCardProps extends Hotel {}

const HotelCard = ({
  Name,
  Rating,
  Reviews,
  Benefits,
  Website,
  isFavorite = false,
}: HotelCardProps) => {
  const [isMarkAsFavorite, setIsMarkAsFavorite] = useState<boolean>(isFavorite)

  const handleFavorite = () => {
    setIsMarkAsFavorite(!isMarkAsFavorite)
  }

  return (
    <Space.Compact
      block
      className="rounded-md overflow-hidden gap-4 border border-gray-300/50"
    >
      <div className="relative">
        <Image
          src={hotel}
          preview={false}
          alt={"hotel"}
          width={300}
          height={250}
        />
        <FavouriteIcon
          onClick={handleFavorite}
          value={isMarkAsFavorite}
          className="absolute top-2 right-2 z-10 w-8 h-8 bg-white flex justify-center items-center rounded-full cursor-pointer"
        />
      </div>
      <div className="flex flex-grow flex-col gap-4 py-4">
        <TypographyTitle text={Name} level={3} className="color-primary" />
        <div className="flex flex-grow gap-2">
          <div className="flex flex-col items-center justify-center">
            <Button type="primary" size="large" className="w-full rounded-md">
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
                value={Number(Rating)}
                character={<FaStar />}
                disabled
              />
              <TypographyText
                text={wordTransformByQuantity(
                  `${Reviews} review`,
                  Number(Reviews)
                )}
                className="text-gray-400"
              />
            </div>
            <div className="flex flex-col">
              {Benefits?.map((benefit, index) => {
                const { icon: Icon, label } = benefit
                return Website && label === "Website" ? (
                  <a
                    href={Website}
                    target="_blank"
                    key={index}
                    className="flex gap-1 items-center"
                  >
                    <Icon />
                    <TypographyText text={label} className="text-gray-500" />
                  </a>
                ) : (
                  <div key={index} className="flex gap-1 items-center">
                    <Icon />
                    <TypographyText text={label} className="text-gray-500" />
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </Space.Compact>
  )
}

export default HotelCard