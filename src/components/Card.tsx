import { LogoDark } from "@/assets/images"
import { useState } from "react"
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai"
import { RiMoneyDollarCircleFill } from "react-icons/ri"
import { getRatingString, toDouble } from "../utils/reusable"

interface CardProps {
  img?: string
  title: string
  description: string
  price: number
  rate: string
  onClickFunc?: () => void
}

const Card = ({
  img,
  title,
  description,
  price,
  rate,
  onClickFunc,
}: CardProps) => {
  const [isFavourite, setIsFavourite] = useState<boolean>(false)
  const handleFavoriteClick = (e: any) => {
    e.stopPropagation()
    setIsFavourite(!isFavourite)
  }

  return (
    <div
      onClick={onClickFunc}
      className="card-container relative flex flex-col box-border md:w-[250px] xl:w-[300px] h-[250px] bg-white rounded-[0.5rem] overflow-hidden border cursor-pointer hover:shadow-md"
    >
      <div className="card-image w-full h-[55%]">
        <img src={img || LogoDark} className="w-full h-full object-cover" />
      </div>
      <div className="card-content p-4 flex-grow flex flex-col">
        <h1 className="font-bold">{title}</h1>
        <p className="truncate">{description}</p>
        <div className="flex gap-2 mt-auto">
          <span
            className={`${
              getRatingString(rate) === "Good"
                ? "text-green-500"
                : getRatingString(rate) === "Bad"
                ? "text-red-500"
                : "text-yellow-500"
            } font-medium`}
          >
            {getRatingString(rate)}
          </span>
          <span className="flex items-center text-primary font-bold ml-auto">
            <RiMoneyDollarCircleFill size={20} />
            {price}
          </span>
        </div>
      </div>
      <div className="absolute top-0 left-0 w-full flex justify-between p-2">
        <div className="w-[36px] aspect-square bg-primary text-white flex justify-center items-center rounded-lg font-bold">
          <span>{toDouble(rate)}</span>
        </div>
        <div
          className="w-[36px] aspect-square flex justify-center items-center text-white bg-black/30 rounded-lg hover:text-primary"
          onClick={(e) => {
            handleFavoriteClick(e)
          }}
        >
          {isFavourite ? (
            <AiFillHeart size={20} />
          ) : (
            <AiOutlineHeart size={20} />
          )}
        </div>
      </div>
    </div>
  )
}

export default Card
