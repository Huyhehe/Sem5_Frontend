import { Logo } from "@/assets/images"
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai"

import { useState } from "react"

interface ILocationItemProps {
  onClick?: () => any
  img?: string
  description: string
}
const LocationItem = (props: ILocationItemProps) => {
  const [isFavourite, setIsFavourite] = useState<boolean>(false)

  const handleFavoriteClick = (e: any) => {
    e.stopPropagation()
    setIsFavourite(!isFavourite)
  }

  return (
    <div
      onClick={props.onClick}
      className="card-container relative flex flex-col box-border xl:w-[410px] h-[300px] bg-white rounded-[0.5rem] overflow-hidden border cursor-pointer hover:shadow-md"
    >
      <div className="card-image w-full h-[70%]">
        <img src={props.img || Logo} className="w-full h-full object-cover" />
      </div>
      <div className="card-content p-4 flex-grow flex flex-col">
        <p className=" text-center text-base font-semibold text-black">
          {props.description}
        </p>
        <div className="flex gap-2 mt-auto"></div>
      </div>
      <div className="absolute top-0 left-0 w-full flex justify-between p-2">
        <div
          className="w-[36px] aspect-square flex justify-center items-center text-black bg-white rounded-[50%] hover:text-primary ml-auto"
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

export default LocationItem
