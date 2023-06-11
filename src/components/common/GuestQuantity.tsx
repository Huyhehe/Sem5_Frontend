import { FaUserAlt } from "react-icons/fa"
import { TiTimes } from "react-icons/ti"

interface GuestQuantityProps {
  quantity: number
}

const GuestQuantity = ({ quantity }: GuestQuantityProps) => {
  const conditionalRender = () => {
    switch (quantity) {
      case 1:
        return (
          <div>
            <FaUserAlt />
          </div>
        )
      case 2:
        return (
          <div className="flex gap-1">
            <FaUserAlt />
            <FaUserAlt />
          </div>
        )
      case 3:
        return (
          <div className="flex gap-1">
            <FaUserAlt />
            <FaUserAlt />
            <FaUserAlt />
          </div>
        )
      default:
        return (
          <div className="flex items-center gap-1">
            <div className="flex items-center">
              <TiTimes />
              {quantity}
            </div>
            <FaUserAlt />
          </div>
        )
    }
  }
  return <div>{conditionalRender()}</div>
}

export default GuestQuantity
