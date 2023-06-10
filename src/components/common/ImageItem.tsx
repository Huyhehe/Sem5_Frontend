import { Badge } from "antd"
import Image, { ImageProps } from "antd/es/image"
import { TiDelete } from "react-icons/ti"

interface ImageItemProps extends ImageProps {
  onRemoveImage?: () => void
}

const ImageItem = ({ onRemoveImage, ...props }: ImageItemProps) => {
  return (
    <Badge
      count={
        <TiDelete
          size={24}
          className="bg-white rounded-full cursor-pointer"
          onClick={() => onRemoveImage?.()}
        />
      }
      title="Delete"
    >
      <Image {...props} width={100} height={100} className="object-cover" />
    </Badge>
  )
}

export default ImageItem
