import { Carousel } from "antd"
import { FunctionComponent, memo, useEffect, useRef, useState } from "react"
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai"
import { useNavigate } from "react-router-dom"
import { Review } from "../../interfaces/Review"
import { getAllReview } from "../../utils/http"
import Card from "../Card"
import CircleButton from "../CircleButton"
import "./slider.css"

interface SliderProps {
  children?: React.ReactNode
}

const Slider: FunctionComponent<SliderProps> = ({ children }) => {
  const carouselRef = useRef<any>(null)
  const [cardItems, setCardItems] = useState<Review[]>([])
  const navigator = useNavigate()

  const handleNext = () => {
    carouselRef?.current?.next()
  }
  const handlePrev = () => {
    carouselRef?.current?.prev()
  }
  const handleCardClick = (id: number) => {
    navigator(`/search/${id}`)
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllReview()
        setCardItems(response)
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
  }, [])

  return (
    <div className="relative z-[0]">
      <Carousel
        ref={carouselRef}
        draggable
        dots={false}
        autoplay
        pauseOnHover
        slidesToShow={4}
        arrows={false}
        responsive={[
          {
            breakpoint: 1280,
            settings: {
              slidesToShow: 3,
            },
          },
          {
            breakpoint: 768,
            settings: {
              slidesToShow: 2,
            },
          },
          {
            breakpoint: 680,
            settings: {
              slidesToShow: 1,
            },
          },
        ]}
      >
        {cardItems.map((item) => {
          return (
            <Card
              key={item.id}
              title={item.title}
              description={item.description}
              price={item.price}
              rate={item.rate}
              onClickFunc={() => handleCardClick(item.id)}
            />
          )
        })}
      </Carousel>
      <CircleButton
        Icon={AiOutlineArrowLeft}
        onClickFunc={handlePrev}
        additionalClass="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-1/2"
      />
      <CircleButton
        Icon={AiOutlineArrowRight}
        onClickFunc={handleNext}
        additionalClass="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/2"
      />
    </div>
  )
}

export default memo(Slider)
