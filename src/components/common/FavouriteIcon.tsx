import { AiFillHeart, AiOutlineHeart } from "react-icons/ai"

export interface FavouriteIconProps {
  value?: boolean
  iconSize?: number
  className?: string
  onClick?: () => void
}

const FavouriteIcon = ({
  value = false,
  iconSize = 20,
  className,
  onClick,
}: FavouriteIconProps) => {
  return (
    <div className={className} onClick={onClick}>
      {value ? (
        <AiFillHeart className="text-red-500" size={iconSize} />
      ) : (
        <AiOutlineHeart className="hover:text-red-500" size={iconSize} />
      )}
    </div>
  )
}

export default FavouriteIcon
