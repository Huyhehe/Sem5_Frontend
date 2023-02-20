import { DropDownProps } from "antd"

export type CustomDropdownProps = {
  Dropdown: React.FC<DropDownProps>
} & DropDownProps

const CustomDropdown = ({ Dropdown, ...props }: CustomDropdownProps) => {
  return (
    <>
      <Dropdown {...props} />
    </>
  )
}

export default CustomDropdown
