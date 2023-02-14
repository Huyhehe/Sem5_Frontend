import { Dropdown } from "antd"
import { AiOutlineUser } from "react-icons/ai"

interface Item {
  title: string
  icon: JSX.Element
  onClick?: () => void
}

interface ProfileDropDownProps {
  mainDisplay: string
  userItems: any
}

const ProfileDropDown = ({
  mainDisplay = "",
  userItems = [],
}: ProfileDropDownProps) => {
  const items = userItems.map((item: Item, index: number) => {
    return {
      key: index as any as string,
      label: (
        <div className="flex gap-1 items-center" onClick={item.onClick}>
          {item.icon}
          <span>{item.title}</span>
        </div>
      ),
    }
  })

  return (
    <Dropdown
      menu={{ items }}
      placement="bottomLeft"
      arrow
      className="cursor-pointer w-[10rem]"
    >
      <div className="flex gap-2 items-center">
        <AiOutlineUser size={20} />
        <span className="text-[1rem] font-medium">{mainDisplay}</span>
      </div>
    </Dropdown>
  )
}

export default ProfileDropDown
