import { DropDownProps } from "antd"

export type CustomDropdownProps = {
  dropdown: React.FC<DropDownProps>
} & DropDownProps

const CustomDropdown = ({
  dropdown: Dropdown,
  ...props
}: CustomDropdownProps) => {
  return (
    <>
      <Dropdown {...props} />
    </>
  )
}

export default CustomDropdown
