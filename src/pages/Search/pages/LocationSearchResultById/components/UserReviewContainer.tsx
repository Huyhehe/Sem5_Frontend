import UserReview from "@/interfaces/UserReview"
import { Input } from "antd"
import { FunctionComponent, useMemo, useState } from "react"
import { AiOutlineSearch } from "react-icons/ai"
import UserReviewArticle from "./UserReviewArticle"

interface UserReviewContainerProps {
  userReviews: UserReview[]
}

const fallbackData = {
  userReviews: [
    {
      id: 1,
      title: "Review 1",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.",
      rate: 4.5,
      user: {
        id: 1,
        name: "User 1",
        email: "test1@gmail.com",
        avatar: "https://i.pravatar.cc/50?img=1",
        address: "Ho Chi Minh City, Vietnam",
      },
      timeWritten: "08-01-2021",
      likes: 0,
    },
    {
      id: 2,
      title: "Review 2",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.",
      rate: 2.5,
      user: {
        id: 2,
        name: "User 2",
        email: "test2@gmail.com",
        avatar: "https://i.pravatar.cc/50?img=3",
        address: "Hanoi City, Vietnam",
      },
      timeWritten: "08-01-2021",
      likes: 0,
    },
  ],
}
const UserReviewContainer: FunctionComponent<UserReviewContainerProps> = ({
  userReviews = fallbackData.userReviews,
}) => {
  let searchTimeout: any

  const [searchQueryString, setSearchQueryString] = useState("")
  const [filteredUserReviews, setFilteredUserReviews] =
    useState<UserReview[]>(userReviews)

  const handleOnChangeSearchInput = (e: any) => {
    const { value } = e.target
    clearTimeout(searchTimeout)
    searchTimeout = setTimeout(() => {
      const filteredUserReviewsRes = userReviews.filter(
        (userReview) =>
          userReview.title.toLowerCase().includes(value.toLowerCase()) ||
          userReview.description.toLowerCase().includes(value.toLowerCase()) ||
          userReview.user.name.toLowerCase().includes(value.toLowerCase())
      )
      setFilteredUserReviews(filteredUserReviewsRes)
      setSearchQueryString(value)
    }, 500)
  }
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
            onChange={handleOnChangeSearchInput}
          />
        </div>
        <div className="review-content-box w-full">
          {filteredUserReviews.map((review, index) => {
            return (
              <div key={index} className="py-8 border-b">
                <UserReviewArticle
                  userReview={review}
                  searchQueryString={searchQueryString}
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
