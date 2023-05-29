import { getAllReviewsByLocation } from "@/service/api/review"
import { ReviewsByLocationResponse } from "@/types/responses"
import Input from "antd/es/input"
import { useEffect, useState } from "react"
import { AiOutlineSearch } from "react-icons/ai"
import UserReviewArticle from "./UserReviewArticle"

interface UserReviewContainerProps {
  locationId: string
}

const UserReviewContainer = ({ locationId }: UserReviewContainerProps) => {
  let searchTimeout: string | number | NodeJS.Timeout | undefined

  const [userReviews, setUserReviews] = useState<ReviewsByLocationResponse>([])
  const [searchString, setSearchString] = useState<string>("")
  const [filteredUserReviews, setFilteredUserReviews] =
    useState<ReviewsByLocationResponse>([...userReviews])

  useEffect(() => {
    setFilteredUserReviews(userReviews)
  }, [userReviews])

  const handleOnChangeSearchInput = (searchValue: string) => {
    clearTimeout(searchTimeout)
    searchTimeout = setTimeout(() => {
      const filteredUserReviewsRes = userReviews.filter(
        (userReview) =>
          userReview.title.toLowerCase().includes(searchValue.toLowerCase()) ||
          userReview.content
            .toLowerCase()
            .includes(searchValue.toLowerCase()) ||
          userReview.user.account.username
            .toLowerCase()
            .includes(searchValue.toLowerCase()) ||
          userReview.user.firstName
            .toLowerCase()
            .includes(searchValue.toLowerCase()) ||
          userReview.user.lastName
            .toLowerCase()
            .includes(searchValue.toLowerCase())
      )
      setFilteredUserReviews(filteredUserReviewsRes)
      setSearchString(searchValue)
    }, 500)
  }

  useEffect(() => {
    if (locationId) {
      const fetchData = async () => {
        try {
          const reviews = await getAllReviewsByLocation(locationId)
          setUserReviews(reviews)
        } catch (error) {
          console.log(error)
        }
      }
      fetchData()
    }
  }, [locationId])
  return (
    <div className="review-container">
      <div className="flex flex-col items-center">
        <div className="review-search-box w-full flex justify-center pb-8 pt-5 border-b border-b-gray-300">
          <Input
            type="text"
            className="group w-[70%] text-[1.25rem] border-[2px] border-gray-300 rounded-full px-4 py-2 outline-none hover:border-black focus-within:border-black"
            placeholder="Search for reviews"
            prefix={
              <AiOutlineSearch
                size={25}
                className="text-gray-300 group-hover:text-black group-focus-within:text-black"
              />
            }
            allowClear
            onChange={(e) => handleOnChangeSearchInput(e.target.value.trim())}
          />
        </div>
        <div className="review-content-box w-full">
          {filteredUserReviews.map((review, index) => {
            return (
              <div key={index} className="py-8 border-b">
                <UserReviewArticle
                  userReview={review}
                  searchQueryString={searchString}
                />
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default UserReviewContainer
