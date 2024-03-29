import { AppContext } from "@/App"
import { LocationTypo } from "@/components/common/LocationTypo"
import Slide from "@/components/common/Slide"
import TypographyText from "@/components/common/TypographyText"
import { addToWishlist, getLocation, removeFromWishlist } from "@/service/api/location"
import { SingleLocationResponse } from "@/types/responses/location"
import { IWishlist } from "@/types/responses/user/wishlist.res.type"
import { getAccessTokenFromLocal } from "@/utils/localStorage"
import { toDouble, wordTransformByQuantity } from "@/utils/reusable"
import { Image, Tabs, notification } from "antd"
import { useContext, useEffect, useState } from "react"
import { AiFillStar, AiOutlineHeart } from "react-icons/ai"
import { BsDot } from "react-icons/bs"
import { HiOutlineChevronDown } from "react-icons/hi"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import UserReviewContainer from "./components/UserReviewContainer"
import "./styles/styles.css"

export const getActiveWishlist = (wishlist: IWishlist[]) => {
  return wishlist?.length > 0
}

const SearchResultById = () => {
  const { id } = useParams()
  const [isRefetch, setIsRefetch] = useState(false)
  const [location, setLocation] = useState<SingleLocationResponse | null>(null)

  const { openNotification, setCurrentRoute } = useContext(AppContext)
  const navigator = useNavigate()
  const currentLocation = useLocation()

  const isActiveWishlist = getActiveWishlist(location?.wishList as IWishlist[])

  const onClickWishlist = async (idLocation: string) => {
    try {
      if (!isActiveWishlist) await addToWishlist(idLocation)
      else await removeFromWishlist(location?.wishList?.[0]?.id as string)
      setIsRefetch(prev => !prev)
    } catch (error) {
      console.log({ error })
    }
  }

  useEffect(() => {
    const promises: Promise<any>[] = []
    promises[0] = getLocation(String(id))
    Promise.all(promises).then(res => {
      setLocation(res[0])
    })
  }, [id, isRefetch])

  const validateValidUser = (
    helperText = "Something has to be checked again"
  ) => {
    const accessToken = getAccessTokenFromLocal()
    setCurrentRoute(currentLocation.pathname)
    if (!accessToken) {
      openNotification("warning", {
        message: "Warning",
        description: (
          <div className="flex flex-col">
            <span>{helperText}</span>
            <span
              className="font-bold underline cursor-pointer"
              onClick={() => {
                navigator("/login/signIn")
                notification.destroy()
              }}
            >
              Sign in
            </span>
          </div>
        ),
      })
      return false
    }
    return true
  }
  const handleReviewButtonClick = () => {
    if (validateValidUser("You need to sign in to review this location")) {
      navigator(`/review/${id}`)
    }
  }

  return (
    <>
      {location && (
        <div className="location-search-result-by-Id pb-8 px-8 md:px-0 flex flex-col gap-8">
          <div className="content-container">
            <div className="content-header">
              <div className="flex flex-col">
                <h1 className="text-[2.5rem] font-bold">{location?.name}</h1>
                {location?.categories?.map((category) => {
                  return (
                    <span className="font-bold text-gray-500" key={category.id}>
                      {"#"}
                      {category.name}
                    </span>
                  )
                })}
              </div>
              <div className="header-icons flex items-center">
                <div
                  className={`bookmark p-2 border-[2px] cursor-pointer ${isActiveWishlist
                    ? 'bg-love border-white text-white hover:border-love hover:bg-white hover:text-love'
                    : ' text-love border-love hover:text-white hover:border-white hover:bg-love'}
                    rounded-full`}
                  onClick={() => onClickWishlist(location?.id)}
                >
                  <AiOutlineHeart size={30} />
                </div>
              </div>
            </div>
            <LocationTypo
              country={location.address?.country?.name}
              province={location.address?.province?.name}
              district={location.address?.district?.name}
              ward={location.address?.ward?.name}
              streetAddress={location.address?.streetAddress}
            />
            <div className="content-rating-wrapper">
              <div className="content-rating">
                <AiFillStar className="star-icon text-gold" size={25} />
                <span className="content-rating_text font-bold">
                  {toDouble(location?.rating || "0")}
                </span>
              </div>
              <BsDot size={30} />
              <div className="content-details">
                <span className="content-rating_text">
                  Rated by{" "}
                  <span className="font-bold">{location.reviewCount}</span>
                  {` ${wordTransformByQuantity(
                    "review",
                    location.reviewCount || 0
                  )}`}
                </span>
              </div>
            </div>
            <div className="content-main flex gap-[2rem]">
              <div className="main-about">
                <h1 className="text-[1.5rem] font-bold mb-4">About</h1>
                <div className="about-paragraph">
                  <TypographyText text={location?.description || ""} />
                  <div className="paragraph-more">
                    <span>Read more</span>
                    <HiOutlineChevronDown />
                  </div>
                </div>
              </div>
              <div className="main-images">
                <Slide slidesToShow={1} autoplay>
                  {location.imageUrlLocations?.length > 0 ? (
                    location.imageUrlLocations?.map((image) => (
                      <div
                        className="w-[673px] flex justify-center items-center"
                        key={image}
                      >
                        <Image
                          src={image}
                          className="object-contain aspect-[16/9]"
                        />
                      </div>
                    ))
                  ) : (
                    <div className="w-[673px] flex justify-center items-center">
                      <Image
                        className="object-contain aspect-[16/9]"
                        fallback="https://images.unsplash.com/photo-1616166330003-8e1b0e2b1b1a?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80"
                      />
                    </div>
                  )}
                </Slide>
              </div>
            </div>
          </div>
          <div className="review-container">
            <div className="review-contribute flex flex-col gap-4">
              <div className="contribute-header">
                <h1 className="text-[1.5rem] font-bold">Contribute</h1>
              </div>
              <div className="contribute-buttons flex gap-4">
                <button
                  className="contribute-button"
                  onClick={handleReviewButtonClick}
                >
                  Write a review
                </button>
                <button className="contribute-button">Upload a photo</button>
              </div>
            </div>
            <div>
              <Tabs size="large">
                <Tabs.TabPane tab="Reviews" key="tab1">
                  <UserReviewContainer locationId={location.id} />
                </Tabs.TabPane>
                <Tabs.TabPane tab="Q&A" key="tab2">
                  <div>Q&A feature is in development progress</div>
                </Tabs.TabPane>
              </Tabs>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default SearchResultById
