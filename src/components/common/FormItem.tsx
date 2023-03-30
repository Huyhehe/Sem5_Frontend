import { Form } from "antd"
import { FormItemProps } from "antd"
import { Rule } from "antd/es/form"

interface IFormItem extends FormItemProps {
  message?: string
}

const trimValidator: Rule = {
  validator(_, value) {
    if (value && value.trim() !== "") {
      return Promise.resolve()
    }
    return Promise.reject(new Error("Please enter a valid value."))
  },
}

const FormItem = ({
  message = "Please fill this field out",
  required,
  children,
  ...props
}: IFormItem) => {
  return (
    <Form.Item
      {...props}
      labelCol={{ span: 24 }}
      rules={
        (required && [
          {
            required: true,
            message,
            ...trimValidator,
          },
        ]) ||
        []
      }
    >
      {children}
    </Form.Item>
  )
}

export default FormItem
