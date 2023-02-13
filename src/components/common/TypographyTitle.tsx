import Title, { TitleProps } from "antd/es/typography/Title"

export interface TypographyTitleProps extends TitleProps {
  text: string
}
const TypographyTitle = ({ text, ...props }: TypographyTitleProps) => {
  return (
    <Title {...props} className="m-0">
      {text}
    </Title>
  )
}

export default TypographyTitle
