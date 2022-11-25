import { FunctionComponent, useMemo } from "react"
import { AiFillStar } from "react-icons/ai"
import { toDouble } from "@/utils/reusable"

interface RatePointProps {
  point: number
}

const RatePoint: FunctionComponent<RatePointProps> = ({ point }) => {
  const ratePoint = useMemo(() => {
    return toDouble(point)
  }, [point])
  return (
    <div className="content-rating flex items-center">
      <AiFillStar className="star-icon text-gold" size={25} />
      <span className="content-rating_text text-[1.25rem] font-bold">
        {ratePoint}
      </span>
    </div>
  )
}

export default RatePoint
