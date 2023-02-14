import { Dropdown, MenuProps } from "antd"

const CustomDropdown = () => {
  const menu: MenuProps["items"] = [
    {
      key: "1",
      label: "Option 1",
    },
  ]
  return (
    <Dropdown
      menu={{ items: menu }}
      placement="bottom"
      className="bg-green-300/20 h-full"
    >
      <div className="flex justify-center">Dropdown</div>
    </Dropdown>
  )
}

export default CustomDropdown
