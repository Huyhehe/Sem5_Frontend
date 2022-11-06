import { FunctionComponent } from "react"
import { AiOutlineHeart } from "react-icons/ai"
import { MdAttachMoney } from "react-icons/md"
import { RiMoneyDollarCircleFill } from "react-icons/ri"
import { example } from "../assets/images"

export interface CardProps {
  img?: string
  title: string
  description: string
  price: number
  rate: number
  review: "Good" | "Bad" | "Average"
  onClickFunc?: () => void
}

const Card: FunctionComponent<CardProps> = ({
  img,
  title,
  description,
  price,
  rate,
  review,
  onClickFunc,
}) => {
  const fixLength = (s: string) => {
    if (s.length > 35) {
      return s.slice(0, 35) + "..."
    }
    return s
  }
  return (
    <div
      onClick={onClickFunc}
      className="card-container relative flex flex-col box-border w-[300px] aspect-[30/25] bg-white rounded-[0.5rem] overflow-hidden border cursor-pointer hover:shadow-md"
    >
      <div className="card-image w-full h-[55%]">
        <img src={example} className="w-full h-full object-cover" />
      </div>
      <div className="card-content p-4 flex-grow flex flex-col">
        <h1 className="font-bold">{title}</h1>
        <p>{fixLength(description)}</p>
        <div className="flex gap-2 mt-auto">
          <span className="text-primary">
            <RiMoneyDollarCircleFill size={20} />
          </span>
          <span>{review}</span>
          <span className="flex items-center text-primary font-bold ml-auto">
            <MdAttachMoney size={20} />
            {price}
          </span>
        </div>
      </div>
      <div className="absolute top-0 left-0 w-full flex justify-between p-2">
        <div className="w-[36px] aspect-square bg-primary text-white flex justify-center items-center rounded-lg font-bold">
          <span>{rate}</span>
        </div>
        <div className="w-[36px] aspect-square flex justify-center items-center text-white bg-black/30 rounded-lg hover:text-primary">
          <AiOutlineHeart size={20} />
        </div>
      </div>
    </div>
  )
}

export default Card
