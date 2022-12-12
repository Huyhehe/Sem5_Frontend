import { getAddressString, getRatingString } from "@/utils/reusable"
import { FunctionComponent } from "react"
import { AiFillStar } from "react-icons/ai"
import { RiMoneyDollarCircleFill } from "react-icons/ri"
import LocationReview from "@/interfaces/LocationReview"

interface SearchCardProps {
  item: LocationReview
  onClickFunc?: () => void
}

const SearchCard: FunctionComponent<SearchCardProps> = ({
  item,
  onClickFunc,
}) => {
  return (
    <div className="h-[12.5rem] flex gap-[1rem] p-[1rem]" onClick={onClickFunc}>
      <div className="search-card-img h-full aspect-square bg-coral">
        <img src="" alt="" />
      </div>
      <div className="search-card-content flex flex-col">
        <div className="content-title text-[1.5rem] font-bold">{item.name}</div>
        <div className="content-address">{getAddressString(item.address)}</div>
        <i className="content-description italic">{item.description}</i>
        <div className="mt-auto">
          <div className="content-price flex items-center">
            <RiMoneyDollarCircleFill size={20} className="text-primary" />
            <span>{item.price_level}</span>
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
