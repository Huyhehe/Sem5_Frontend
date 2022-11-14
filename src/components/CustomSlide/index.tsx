import { Empty } from "antd"
import React, { FunctionComponent, useEffect } from "react"
import CircleButton from "../CircleButton"
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai"

interface CustomSlideProps {
  children?: React.ReactNode[] | React.ReactNode
  size: number
}

const CustomSlide: FunctionComponent<CustomSlideProps> = ({
  children,
  size,
}) => {
  const [childrenArray, setChildrenArray] = React.useState<React.ReactNode[]>()
  const [currentSlide, setCurrentSlide] = React.useState(0)
  console.log(childrenArray?.length)

  useEffect(() => {
    if (children) {
      if (Array.isArray(children)) {
        setChildrenArray(children)
      } else {
        setChildrenArray([children])
      }
    }
  }, [children])
  const next = () => {
    if (currentSlide < childrenArray?.length! - 1) {
      setCurrentSlide(currentSlide + 1)
    }
  }
  const prev = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1)
    }
  }

  return (
    <div className="relative">
      <div className="bg-gray-200 min-h-[300px] overflow-hidden">
        {childrenArray ? (
          <div
            style={{
              width: `${(childrenArray?.length || 0) * size}px`,
              transform: `translateX(-${currentSlide * size}px)`,
            }}
            className=" flex justify-center items-stretch"
          >
            {childrenArray}
          </div>
        ) : (
          <Empty />
        )}
      </div>
      {childrenArray && (
        <>
          <CircleButton
            Icon={AiOutlineArrowRight}
            onClickFunc={next}
            additionalClass="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/2"
          />
          <CircleButton
            Icon={AiOutlineArrowLeft}
            onClickFunc={prev}
            additionalClass="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-1/2"
          />
        </>
      )}
    </div>
  )
}

export default CustomSlide
