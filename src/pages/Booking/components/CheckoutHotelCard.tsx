import ImageIcon from "@/components/common/ImageIcon"
import TypographyText from "@/components/common/TypographyText"
import TypographyTitle from "@/components/common/TypographyTitle"
import { Hotel } from "@/interfaces/hotel"
import { shortenAmenities } from "@/pages/Hotel/components/Main/utils"
import {
  getRatingString,
  toDouble,
  wordTransformByQuantity,
} from "@/utils/reusable"
import { AiFillLike, AiFillStar } from "react-icons/ai"
import { BsDot } from "react-icons/bs"
import { FaPlus } from "react-icons/fa"

interface CheckoutHotelCardProps {
  hotel: Hotel
}

const CheckoutHotelCard = ({ hotel }: CheckoutHotelCardProps) => {
  const address =
    hotel.location.address.streetAddress +
    ", " +
    hotel.location.address.ward.name +
    ", " +
    hotel.location.address.district.name +
    ", " +
    hotel.location.address.province.name +
    ", " +
    hotel.location.address.country.name
  return (
    <div className="flex p-4 rounded-lg border gap-4">
      <img
        src={hotel?.location?.locationImages?.[0]?.imageUrl}
        alt="hotel"
        className="w-[10rem] aspect-square object-cover rounded-lg"
      />
      <div className="w-full flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <TypographyText text="Hotel" />
          <div className="flex text-gold">
            {Array.from({ length: hotel.hotelClass }).map((_, index) => (
              <AiFillStar size={16} key={index} />
            ))}
          </div>
          <div className="flex text-white items-center bg-gold rounded-md p-1 gap-1">
            <AiFillLike />
            <FaPlus size={14} />
          </div>
        </div>
        <TypographyTitle
          text={hotel.location.name}
          level={4}
          className="font-black"
        />
        <TypographyText text={address} />
        <div className="flex items-center gap-[0.25rem]">
          <span className="text-sm text-white p-1 bg-primary rounded-lg">
            {toDouble(hotel.location.rating)}
          </span>
          <TypographyText
            text={`${getRatingString(hotel.location.rating)}`}
            className="ml-2"
          />
          <BsDot />
          <TypographyText
            text={`${hotel.location.reviewCount} ${wordTransformByQuantity(
              "review",
              hotel.location.reviewCount
            )}`}
          />
        </div>
        <div className="flex gap-2 items-center">
          {shortenAmenities(hotel.propertyAmenities, 3).map((amenity) => (
            <div key={amenity.id} className="flex gap-1 items-center">
              {amenity.icon && (
                <ImageIcon icon={amenity.icon} className="w-5" />
              )}
              <span className="text-[12px]">{amenity.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default CheckoutHotelCard
