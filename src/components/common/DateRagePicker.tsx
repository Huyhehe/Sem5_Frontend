import { DatePicker } from "antd"
import type { RangePickerProps } from "antd/es/date-picker"
import locale from "antd/es/date-picker/locale/en_US"

const { RangePicker } = DatePicker

export type DateRagePickerProps = {} & RangePickerProps

export const DateRagePicker = ({ ...props }: DateRagePickerProps) => {
  return <RangePicker {...props} locale={locale} />
}
