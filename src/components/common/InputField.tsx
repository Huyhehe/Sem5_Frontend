import Input, { InputProps } from "antd/es/input/Input"
interface InputFieldProps extends InputProps {
  trim?: boolean
}

const InputField = (props: InputFieldProps) => {
  return <Input {...props} />
}

export default InputField
