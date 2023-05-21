import { LocationTypo } from "@/components/common/LocationTypo"
import { Location } from "@/interfaces/location"
import { getRatingString } from "@/utils/reusable"
import { AiFillStar } from "react-icons/ai"
import { RiMoneyDollarCircleFill } from "react-icons/ri"

interface SearchCardProps {
  item: Pick<
    Location,
    "id" | "name" | "description" | "rating" | "address" | "locationImages"
  >
  onClickFunc?: () => void
}

const SearchCard = ({ item, onClickFunc }: SearchCardProps) => {
  return (
    <div
      className="h-[12.5rem] flex gap-[1rem] p-[1rem] cursor-pointer"
      onClick={onClickFunc}
    >
      <div className="search-card-img h-full aspect-square bg-coral object-cover">
        <img
          src={item.locationImages[0]?.imageUrl}
          alt={item.locationImages[0]?.imageKey}
          className={
            item.locationImages[0]?.imageUrl ? "w-full h-full object-cover" : ""
          }
        />
      </div>
      <div className="search-card-content flex flex-col">
        <div className="content-title text-[1.5rem] font-bold">{item.name}</div>
        <div className="content-address">
          <LocationTypo
            country={item.address?.country?.name}
            province={item.address?.province?.name}
            district={item.address?.district?.name}
            ward={item.address?.ward?.name}
            streetAddress={item.address?.streetAddress}
          />
        </div>
        <i className="content-description italic">{item.description}</i>
        <div className="mt-auto">
          <div className="content-price flex items-center">
            <RiMoneyDollarCircleFill size={20} className="text-primary" />
            <span>0</span>
          </div>
          <div className="content-rate flex gap-1 items-center">
            <span>{item.rating}</span>
            <AiFillStar className="text-gold" />
            <span className="w-[2px] self-stretch bg-gray-300"></span>
            <span
              className={
                "text-sm font-bold " +
                (getRatingString(item.rating) === "Good"
                  ? "text-green-500"
                  : getRatingString(item.rating) === "Bad"
                  ? "text-red-500"
                  : "text-yellow-500")
              }
            >
              {getRatingString(item.rating)}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SearchCard
