import { Typography } from "antd"
import { TextProps } from "antd/es/typography/Text"
import { ReactNode } from "react"

const { Text } = Typography
export interface TypographyTextProps extends TextProps {
  text: ReactNode
}

const TypographyText = ({ text, ...props }: TypographyTextProps) => {
  return <Text {...props}>{text}</Text>
}

export default TypographyText
