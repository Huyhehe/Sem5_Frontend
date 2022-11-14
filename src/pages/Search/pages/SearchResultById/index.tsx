import { FunctionComponent, useEffect, useState } from "react"
import { AiFillStar } from "react-icons/ai"
import { BsDot } from "react-icons/bs"
import { HiOutlineChevronDown } from "react-icons/hi"
import { useParams } from "react-router-dom"
import { Review } from "@/interfaces/Review"
import { getReviewById } from "@/utils/http"
import { toDouble } from "@/utils/reusable"
import { AiOutlineHeart } from "react-icons/ai"
import "./styles/styles.css"
import { Carousel, Image } from "antd"
import { example } from "@/assets/images"
import CustomSlide from "@/components/CustomSlide"

interface SearchResultByIdProps {}

const SearchResultById: FunctionComponent<SearchResultByIdProps> = () => {
  const { id } = useParams()
  const [review, setReview] = useState<Review | null>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      const response = await getReviewById(Number(id))
      setReview(response)
    }
    fetchData()
  }, [])

  return (
    <div className="searchResult-container">
      <div className="content-container">
        <div className="content-header">
          <h1 className="text-[2.5rem] font-bold self-end">{review?.title}</h1>
          <div className="header-icons flex items-center">
            <div className="p-2 border-[2px] text-love border-love rounded-full hover:text-white hover:border-white hover:bg-love cursor-pointer">
              <AiOutlineHeart size={30} />
            </div>
          </div>
        </div>
        <div className="content-rating-wrapper">
          <div className="content-rating">
            <AiFillStar className="star-icon text-gold" size={25} />
            <span className="content-rating_text font-bold">
              {toDouble(review?.rate || 0)}
            </span>
          </div>
          <BsDot size={30} />
          <div className="content-details">
            <span className="content-rating_text">Rated by ? people</span>
          </div>
        </div>
        <div className="content-main flex gap-[2rem]">
          <div className="main-about">
            <h1 className="text-[1.5rem] font-bold mb-4">About</h1>
            <div className="about-paragraph">
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Expedita reiciendis, voluptatibus, nisi tempore ab placeat enim
                culpa quidem consectetur ea assumenda ex animi exercitationem
                labore sapiente ut dolore fugiat consequatur!
              </p>
              <div className="paragraph-more">
                <span>Read more</span>
                <HiOutlineChevronDown />
              </div>
            </div>
          </div>
          <div className="main-images">
            <CustomSlide size={860}>
              <div className="w-[860px] aspect-[16/9] flex justify-center">
                <img
                  src="https://gw.alipayobjects.com/zos/antfincdn/LlvErxo8H9/photo-1503185912284-5271ff81b9a8.webp"
                  className="w-full object-cover"
                />
              </div>
              <div className="w-[860px] aspect-[16/9] flex justify-center">
                <img src={example} className="w-full object-cover" />
              </div>
              <div className="w-[860px] aspect-[16/9] flex justify-center">
                <Image
                  src="https://gw.alipayobjects.com/zos/antfincdn/LlvErxo8H9/photo-1503185912284-5271ff81b9a8.webp"
                  className="object-cover"
                />
              </div>
              <div className="w-[860px] flex justify-center">
                <Image
                  src="https://gw.alipayobjects.com/zos/antfincdn/LlvErxo8H9/photo-1503185912284-5271ff81b9a8.webp"
                  width={250}
                />
              </div>
            </CustomSlide>
          </div>
        </div>
      </div>
      <div className="review-container"></div>
    </div>
  )
}

export default SearchResultById
