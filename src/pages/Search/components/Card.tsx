import { FunctionComponent } from "react"
import { AiFillStar } from "react-icons/ai"
import { RiMoneyDollarCircleFill } from "react-icons/ri"

export interface Item {
  img?: string
  title: string
  address: string
  description: string
  price: number
  rate: number
  review: "Good" | "Bad" | "Average"
}

interface SearchCardProps {
  item: Item
}

const SearchCard: FunctionComponent<SearchCardProps> = ({ item }) => {
  return (
    <div className="h-[12.5rem] flex gap-[1rem] p-[1rem]">
      <div className="search-card-img h-full aspect-square bg-coral">
        <img src="" alt="" />
      </div>
      <div className="search-card-content flex flex-col">
        <div className="content-title text-[1.5rem] font-bold">
          {item.title}
        </div>
        <div className="content-address">{item.address}</div>
        <i className="content-description italic">{item.description}</i>
        <div className="mt-auto">
          <div className="content-price flex items-center">
            <RiMoneyDollarCircleFill size={20} className="text-primary" />
            <span>{item.price}</span>
          </div>
          <div className="content-rate flex gap-1 items-center">
            <span>{item.rate}</span>
            <AiFillStar className="text-gold" />
            <span className="w-[2px] self-stretch bg-gray-300"></span>
            <span
              className={
                "text-sm font-bold " +
                (item.review === "Good"
                  ? "text-green-500"
                  : item.review === "Average"
                  ? "text-gold"
                  : "text-primary")
              }
            >
              {item.review}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SearchCard
