import { FaLocationArrow } from "react-icons/fa"

interface LocationTypoProps {
  country?: string | undefined | null
  province?: string | undefined | null
  district?: string | undefined | null
  ward?: string | undefined | null
  streetAddress?: string
  extendClassName?: string
}

const checkEmptyAddress = (value: (string | null)[]) => {
  return value.every((item) => !item)
}

export const LocationTypo = ({
  country = "",
  province = "",
  district = "",
  ward = "",
  streetAddress = "",
  extendClassName = "",
}: LocationTypoProps) => {
  const renderAddress = () => {
    return `${streetAddress ? streetAddress + "," : ""} ${
      ward ? ward + "," : ""
    } ${district ? district + "," : ""} ${province ? province + "," : ""} ${
      country ? country : ""
    }
    `
  }

  return (
    <div className={`flex gap-2 items-center ${extendClassName}`}>
      <div>
        <FaLocationArrow />
      </div>
      {!checkEmptyAddress([
        country,
        province,
        district,
        ward,
        streetAddress,
      ]) ? (
        <span>{renderAddress()}</span>
      ) : (
        <span>Update your address</span>
      )}
    </div>
  )
}
