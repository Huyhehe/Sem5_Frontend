import {
  compareMatchingString,
  convertToStringIdObjectArray,
} from "@/utils/reusable"
import { Select } from "antd"

interface BaseEntity {
  id?: string
  name?: string
}

interface SelectorFieldProps<T> {
  options: T[]
  onChange?: (value: string) => void
  onFocus?: () => void
  placeholder: string
  value?: string
}

const checkIsIdObjectArray = <T extends BaseEntity>(options: T[]) => {
  return options.every((option) => "id" in option)
}

const extractOptions = <T extends BaseEntity>(options: T[]) => {
  const convertedOptions = convertToStringIdObjectArray(options)
  return (
    checkIsIdObjectArray(convertedOptions) &&
    convertedOptions?.map((option) => {
      return {
        label: option.name,
        value: option.id,
      }
    })
  )
}

const SelectorField = <T extends BaseEntity>({
  options,
  onChange,
  placeholder,
  value,
  onFocus,
  ...props
}: SelectorFieldProps<T>) => {
  return (
    <Select
      {...props}
      showSearch
      filterOption={(input, option) =>
        compareMatchingString(option?.label ?? "", input)
      }
      filterSort={(optionA, optionB) =>
        (optionA?.label ?? "")
          .toLowerCase()
          .localeCompare((optionB?.label ?? "").toLowerCase())
      }
      value={value}
      allowClear
      placeholder={placeholder}
      options={extractOptions(options) || []}
      onChange={onChange}
      onFocus={onFocus}
    />
  )
}

export default SelectorField
