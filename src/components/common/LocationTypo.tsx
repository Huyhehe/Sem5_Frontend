import { FaLocationArrow } from "react-icons/fa"

interface LocationTypoProps {
  country: string
  province: string
  district: string
  street_address?: string
  extendClassName?: string
}

export const LocationTypo = ({
  country = "",
  province = "",
  district = "",
  street_address = "",
  extendClassName = "",
}: LocationTypoProps) => {
  return (
    <div className={`flex gap-2 items-center ${extendClassName}`}>
      <FaLocationArrow />
      <span>
        {street_address
          ? `${street_address}, ${district}, ${province}, ${country}`
          : `${district}, ${province}, ${country}`}
      </span>
    </div>
  )
}
