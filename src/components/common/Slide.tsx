import { Carousel } from "antd"
import { CarouselProps, CarouselRef } from "antd/es/carousel"
import { useRef } from "react"
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai"
import CircleButton from "../CircleButton"

export interface SlideProps extends CarouselProps {
  isShowArrow?: boolean
  wrapperClass?: string
}

const defaultResponsive = [
  {
    breakpoint: 1024,
    settings: {
      slidesToShow: 3,
      slidesToScroll: 3,
      infinite: true,
      dots: true,
    },
  },
  {
    breakpoint: 600,
    settings: {
      slidesToShow: 2,
      slidesToScroll: 2,
      initialSlide: 2,
    },
  },
  {
    breakpoint: 480,
    settings: {
      slidesToShow: 1,
      slidesToScroll: 1,
    },
  },
]

const Slide = ({
  children,
  slidesToShow = 4,
  dots = false,
  autoplay = false,
  pauseOnHover = true,
  responsive = defaultResponsive,
  isShowArrow = true,
  wrapperClass = "",
  ...props
}: SlideProps) => {
  const ref = useRef<CarouselRef>(null)
  const next = () => {
    ref.current?.next()
  }
  const prev = () => {
    ref.current?.prev()
  }

  return (
    <div className={`relative ${wrapperClass}`}>
      <Carousel
        {...props}
        ref={ref}
        autoplay={autoplay}
        slidesToShow={slidesToShow}
        pauseOnHover
        dots={dots}
        responsive={responsive}
      >
        {children}
      </Carousel>
      {isShowArrow && (
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

export default Slide
