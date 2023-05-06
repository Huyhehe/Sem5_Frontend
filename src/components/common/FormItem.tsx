import {
  validateStringInputForNumberOnly,
  validateStringInputForTextOnly,
} from "@/utils"
import { Form } from "antd"
import { FormItemProps } from "antd"
import { Rule } from "antd/es/form"

interface IFormItem extends FormItemProps {
  message?: string
  trim?: boolean
  allowTextOnly?: boolean
  allowNumberOnly?: boolean
}

const trimValidator: Rule = {
  validator(_, value) {
    if (value && value.trim() !== value) {
      return Promise.reject(
        new Error("Leading or trailing whitespace is not allowed")
      )
    }
    return Promise.resolve()
  },
}

const FormItem = ({
  message = "Please fill this field out",
  required = false,
  labelCol = { span: 24 },
  rules = [],
  trim = false,
  allowTextOnly = false,
  allowNumberOnly = false,
  children,
  ...props
}: IFormItem) => {
  return (
    <Form.Item
      {...props}
      labelCol={labelCol}
      rules={[
        {
          ...(required && { required: true, message }),
        },
        { ...(trim && { ...trimValidator }) },
        {
          ...(allowTextOnly && {
            ...validateStringInputForTextOnly(
              "This field can't contain any number or special character"
            ),
          }),
        },
        {
          ...(allowNumberOnly && {
            ...validateStringInputForNumberOnly(
              "This field can't contain any text or special character"
            ),
          }),
        },
        ...rules,
      ]}
    >
      {children}
    </Form.Item>
  )
}

export default FormItem
