import { Form } from "antd"
import { FormItemProps } from "antd"
import { Rule } from "antd/es/form"

interface IFormItem extends FormItemProps {
  message?: string
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
  required,
  labelCol = { span: 24 },
  rules = [],
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
        { ...trimValidator },
        ...rules,
      ]}
    >
      {children}
    </Form.Item>
  )
}

export default FormItem
