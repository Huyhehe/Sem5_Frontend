import { Typography } from "antd"
import { TextProps } from "antd/es/typography/Text"

const { Text } = Typography
export interface TypographyTextProps extends TextProps {
  text: string
}

const TypographyText = ({ text, ...props }: TypographyTextProps) => {
  return <Text {...props}>{text}</Text>
}

export default TypographyText
