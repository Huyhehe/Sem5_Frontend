import TypographyTitle from "@/components/common/TypographyTitle"
import { InputNumber, Space } from "antd"
import { Dispatch, SetStateAction } from "react"

interface BaseEntity {
  room: number
  people: number
}

interface CountBoxProps<T> {
  label?: string
  icon?: React.ReactNode
  parentState?: number
  setParentState?: Dispatch<SetStateAction<T>>
}

const CountBox = <T extends BaseEntity>({
  label,
  icon,
  parentState,
  setParentState,
}: CountBoxProps<T>) => {
  const RenderLabelNode = () => {
    return (
      <Space align="center">
        {icon}
        <TypographyTitle text={label} level={4} className="capitalize" />
      </Space>
    )
  }

  return (
    <div className="flex justify-between items-center">
      <RenderLabelNode />
      <InputNumber
        min={0}
        value={parentState}
        onChange={(e) => {
          label &&
            setParentState &&
            setParentState(
              (prevState) =>
                ({
                  ...prevState,
                  [label]: e,
                } as T)
            )
        }}
      />
    </div>
  )
}

export default CountBox
