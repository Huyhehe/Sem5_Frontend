import { Carousel } from "antd"
import { FunctionComponent, memo, useRef } from "react"
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai"
import Card, { CardProps } from "../Card"
import CircleButton from "../CircleButton"
import "./slider.css"

interface SliderProps {
  children?: React.ReactNode
}

const Slider: FunctionComponent<SliderProps> = ({ children }) => {
  const carouselRef = useRef<any>(null)
  const cardItems: Array<CardProps> = [
    {
      title: "Good recipe makes good day",
      description: "aksjdlasjdklajsdkljasasdasdasdasldkj",
      price: 100,
      rate: 8.5,
      review: "Good",
    },
    {
      title: "Good recipe makes good day",
      description: "aksjdlasjdklajsdkljasasdasdasdasldkj",
      price: 100,
      rate: 8.5,
      review: "Good",
    },
    {
      title: "Good recipe makes good day",
      description: "aksjdlasjdklajsdkljasasdasdasdasldkj",
      price: 100,
      rate: 8.5,
      review: "Good",
    },
    {
      title: "Good recipe makes good day",
      description: "aksjdlasjdklajsdkljasasdasdasdasldkj",
      price: 100,
      rate: 8.5,
      review: "Good",
    },

    {
      title: "Good recipe makes good day",
      description: "aksjdlasjdklajsdkljasasdasdasdasldkj",
      price: 100,
      rate: 8.5,
      review: "Good",
    },
    {
      title: "Good recipe makes good day",
      description: "aksjdlasjdklajsdkljasasdasdasdasldkj",
      price: 100,
      rate: 8.5,
      review: "Good",
    },
    {
      title: "Good recipe makes good day",
      description: "aksjdlasjdklajsdkljasasdasdasdasldkj",
      price: 100,
      rate: 8.5,
      review: "Good",
    },
    {
      title: "Good recipe makes good day",
      description: "aksjdlasjdklajsdkljasasdasdasdasldkj",
      price: 100,
      rate: 8.5,
      review: "Good",
    },
    {
      title: "Good recipe makes good day",
      description: "aksjdlasjdklajsdkljasasdasdasdasldkj",
      price: 100,
      rate: 8.5,
      review: "Good",
    },
    {
      title: "Good recipe makes good day",
      description: "aksjdlasjdklajsdkljasasdasdasdasldkj",
      price: 100,
      rate: 8.5,
      review: "Good",
    },
    {
      title: "Good recipe makes good day",
      description: "aksjdlasjdklajsdkljasasdasdasdasldkj",
      price: 100,
      rate: 8.5,
      review: "Good",
    },
    {
      title: "Good recipe makes good day",
      description: "aksjdlasjdklajsdkljasasdasdasdasldkj",
      price: 100,
      rate: 8.5,
      review: "Good",
    },
    {
      title: "Good recipe makes good day",
      description: "aksjdlasjdklajsdkljasasdasdasdasldkj",
      price: 100,
      rate: 8.5,
      review: "Good",
    },
    {
      title: "Good recipe makes good day",
      description: "aksjdlasjdklajsdkljasasdasdasdasldkj",
      price: 100,
      rate: 8.5,
      review: "Good",
    },
    {
      title: "Good recipe makes good day",
      description: "aksjdlasjdklajsdkljasasdasdasdasldkj",
      price: 100,
      rate: 8.5,
      review: "Good",
    },
    {
      title: "Good recipe makes good day",
      description: "aksjdlasjdklajsdkljasasdasdasdasldkj",
      price: 100,
      rate: 8.5,
      review: "Good",
    },
  ]

  const listToMatrix = (
    list: Array<CardProps>,
    elementsPerSubArray: number
  ) => {
    let matrix: Array<Array<CardProps>> = [],
      i,
      k

    for (i = 0, k = -1; i < list.length; i++) {
      if (i % elementsPerSubArray === 0) {
        k++
        matrix[k] = []
      }

      matrix[k].push(list[i])
    }

    return matrix
  }

  const handleNext = () => {
    carouselRef?.current?.next()
    console.log(carouselRef.current)
  }
  const handlePrev = () => {
    carouselRef?.current?.prev()
  }

  return (
    <div className="relative">
      <Carousel
        ref={carouselRef}
        draggable
        dots={false}
        autoplay
        pauseOnHover
        slidesToShow={4}
        arrows={false}
      >
        {cardItems.map((item, index) => {
          return (
            <Card
              key={index}
              title={item.title}
              description={item.description}
              price={item.price}
              rate={item.rate}
              review={item.review}
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
        additionalClass="absolute top-1/2 right-0 -translate-y-1/2 translate-x-[calc(50%_-_15px)]"
      />
    </div>
  )
}

export default memo(Slider)
