import { example } from "@/assets/images"
import CustomSlide from "@/components/CustomSlide"
import LocationReview from "@/interfaces/LocationReview"
import { getLocationReviewById } from "@/utils/http"
import { toDouble } from "@/utils/reusable"
import { Image, Tabs } from "antd"
import { FunctionComponent, useEffect, useState } from "react"
import { AiFillStar, AiOutlineHeart } from "react-icons/ai"
import { BsDot } from "react-icons/bs"
import { HiOutlineChevronDown } from "react-icons/hi"
import { useParams } from "react-router-dom"
import UserReviewContainer from "./components/UserReviewContainer"
import "./styles/styles.css"

interface SearchResultByIdProps {}

const SearchResultById: FunctionComponent<SearchResultByIdProps> = () => {
  const { id } = useParams()
  const [locationReview, setLocationReview] = useState<LocationReview | null>(
    null
  )
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getLocationReviewById(Number(id))
        setLocationReview(response)
        document.title = response.title
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
  }, [])

  return (
    <div className="location-search-result-by-Id pb-8">
      <div className="content-container">
        <div className="content-header">
          <h1 className="text-[2.5rem] font-bold self-end">
            {locationReview?.title}
          </h1>
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
              {toDouble(locationReview?.rate || 0)}
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
              <p>{locationReview?.description}</p>
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
                <img src={example} className="max-w-full object-cover" />
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
      <div className="review-container">
        <div>
          <Tabs size="large">
            <Tabs.TabPane tab="Reviews" key="tab1">
              <UserReviewContainer userReview={locationReview?.userReviews} />
            </Tabs.TabPane>
            <Tabs.TabPane tab="Q&A" key="tab2">
              <div>Q&A feature is in development progress</div>
            </Tabs.TabPane>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

export default SearchResultById
