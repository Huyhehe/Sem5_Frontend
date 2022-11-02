import { Carousel } from "antd"
import { FunctionComponent, memo } from "react"
import Card, { CardProps } from "../Card"
import "./slider.css"

interface SliderProps {
  children?: React.ReactNode
}

const Slider: FunctionComponent<SliderProps> = ({ children }) => {
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

  return (
    <div>
      <Carousel dots={true}>
        {listToMatrix(cardItems, 4).map((group, index) => {
          return (
            <div key={index} className="flex gap-[20px]">
              {group.map((item, index) => {
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
            </div>
          )
        })}
      </Carousel>
    </div>
  )
}

export default memo(Slider)
