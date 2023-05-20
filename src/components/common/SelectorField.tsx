import { SelectType } from "@/types/responses/common"
import {
  compareMatchingString,
  convertDataForSelectOptions,
} from "@/utils/reusable"
import Select, { DefaultOptionType, SelectProps } from "antd/es/select"
import { useEffect, useState } from "react"

type SelectorFieldProps = SelectProps & {
  options?: Pick<DefaultOptionType, "label" | "value">[]
  fetchOptions?: () => Promise<SelectType[]>
}

const SelectorField = ({
  options: defaultOptions,
  fetchOptions,
  ...props
}: SelectorFieldProps) => {
  const [options, setOptions] = useState<
    Pick<DefaultOptionType, "label" | "value">[]
  >([])

  useEffect(() => {
    const fetch = async () => {
      if (fetchOptions) {
        try {
          const result = await fetchOptions()
          const convertedOptions =
            convertDataForSelectOptions<SelectType>(result)
          setOptions(convertedOptions)
        } catch (error) {
          console.log(error)
        }
      }
    }
    fetch()
  }, [fetchOptions])

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
      options={defaultOptions || options || []}
    />
  )
}

export default SelectorField
