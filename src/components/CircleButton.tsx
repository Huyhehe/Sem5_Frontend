import { IconType } from "react-icons/lib"

interface CircleButtonProps {
  Icon: IconType
  onClickFunc?: () => void
  additionalClass?: string
}

const CircleButton = ({
  Icon,
  onClickFunc,
  additionalClass,
}: CircleButtonProps) => {
  return (
    <div className={additionalClass}>
      <button
        onClick={onClickFunc}
        className="w-[3rem] aspect-square flex justify-center items-center text-black bg-white rounded-full hover:text-primary shadow-md shadow-primary/10 hover:shadow-primary/20"
      >
        <Icon size={20} />
      </button>
    </div>
  )
}

export default CircleButton
