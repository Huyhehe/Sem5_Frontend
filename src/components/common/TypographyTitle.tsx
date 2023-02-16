import Title, { TitleProps } from "antd/es/typography/Title"
import { ReactNode } from "react"

export interface TypographyTitleProps extends TitleProps {
  text: string | number | ReactNode
  className?: string
}
const TypographyTitle = ({
  text,
  className,
  ...props
}: TypographyTitleProps) => {
  return (
    <Title {...props} className={`m-0 ${className}`}>
      {text}
    </Title>
  )
}

export default TypographyTitle
