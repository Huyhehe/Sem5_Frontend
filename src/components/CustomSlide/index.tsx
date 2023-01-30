import { Empty } from "antd"
import React from "react"
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai"
import CircleButton from "../CircleButton"

interface CustomSlideProps {
  children?: React.ReactNode[] | React.ReactNode
  size: number
  className?: string
  slideToShow?: any
  slideBgColor?: string
}

const CustomSlide = ({
  children,
  size,
  className,
  slideBgColor = "bg-gray-200",
  slideToShow = 1,
}: CustomSlideProps) => {
  const [childrenArray, setChildrenArray] = React.useState<
    React.ReactNode[] | null
  >()
  const [currentSlide, setCurrentSlide] = React.useState(0)

  React.useEffect(() => {
    if (children) {
      if (Array.isArray(children)) {
        setChildrenArray(children)
      } else {
        setChildrenArray([children])
      }
    } else {
      setChildrenArray(null)
    }
  }, [children])
  const next = () => {
    if (
      currentSlide < childrenArray?.length! - 1 &&
      currentSlide < childrenArray?.length! - slideToShow
    ) {
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
      <div className={`overflow-hidden ${slideBgColor}`}>
        {childrenArray ? (
          <div
            style={{
              width: `${(childrenArray?.length || 0) * size}px`,
              transform: `translateX(-${currentSlide * size}px)`,
            }}
            className={`flex ${
              slideToShow === 1 ? "justify-center" : ""
            } items-stretch ${className}`}
          >
            {childrenArray}
          </div>
        ) : (
          <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            description="No result"
            className="text-[1.5rem]"
          />
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
