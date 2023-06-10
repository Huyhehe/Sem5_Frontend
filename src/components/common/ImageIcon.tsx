import { Tooltip } from "antd"

interface ImageIconProps {
  icon?: string
  name?: string
  className?: string
}

const ImageIcon = ({ icon, name, className }: ImageIconProps) => {
  return (
    <Tooltip title={name} placement="bottom">
      <img src={icon} alt={icon} className={`aspect-square ${className}`} />
    </Tooltip>
  )
}

export default ImageIcon
