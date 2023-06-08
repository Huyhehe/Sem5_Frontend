import Progress, { ProgressProps } from "antd/es/progress"
import { ReactNode } from "react"

interface ProgressBarProps extends ProgressProps {
  description?: ReactNode
}

const ProgressBar = ({ description, ...props }: ProgressBarProps) => {
  return (
    <div>
      <Progress {...props} />
      <div>{description}</div>
    </div>
  )
}

export default ProgressBar
