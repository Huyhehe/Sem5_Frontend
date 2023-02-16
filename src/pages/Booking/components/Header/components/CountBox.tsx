import TypographyTitle from "@/components/common/TypographyTitle"
import { InputNumber, Space } from "antd"
import React, { memo } from "react"

interface CountBoxProps {
  label?: string
  icon?: React.ReactNode
  min?: number
  max?: number
  onChange?: (e: number) => void
  value: number
}

const RenderLabelNode = memo(
  ({ icon, label }: { icon: React.ReactNode; label: string }) => {
    return (
      <Space align="center">
        <>
          {icon}
          <TypographyTitle text={label} level={4} className="capitalize" />
        </>
      </Space>
    )
  }
)

const CountBox = ({
  label,
  icon,
  min = 0,
  max = 999,
  onChange,
  value,
  ...props
}: CountBoxProps) => {
  return (
    <div className="flex justify-between items-center">
      <RenderLabelNode icon={icon} label={label || ""} />
      <InputNumber
        onChange={(value) => value && onChange && onChange(value)}
        min={min}
        max={max}
        value={value}
        {...props}
      />
    </div>
  )
}

export default CountBox
