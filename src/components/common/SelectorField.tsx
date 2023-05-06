import { compareMatchingString } from "@/utils/reusable"
import Select, { DefaultOptionType, SelectProps } from "antd/es/select"

interface SelectorFieldProps extends SelectProps {
  options: Pick<DefaultOptionType, "label" | "value">[]
}

const SelectorField = ({ options, ...props }: SelectorFieldProps) => {
  return (
    <Select
      {...props}
      showSearch
      filterOption={(input, option) =>
        compareMatchingString(String(option?.label) ?? "", input)
      }
      filterSort={(optionA, optionB) =>
        String(optionA?.label ?? "")
          .toLowerCase()
          .localeCompare(String(optionB?.label ?? "").toLowerCase())
      }
      allowClear
      options={options || []}
    />
  )
}

export default SelectorField
