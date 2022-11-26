import { AppContext } from "@/App"
import RatePoint from "@/components/common/RatePoint"
import useUser from "@/hooks/useUser"
import UserReview from "@/interfaces/UserReview"
import { notification } from "antd"
import { FunctionComponent, useContext, useState } from "react"
import { AiFillLike, AiOutlineLike } from "react-icons/ai"
import { SlOptionsVertical } from "react-icons/sl"
import { useNavigate } from "react-router-dom"

interface UserReviewArticleProps {
  userReview: UserReview
  searchQueryString: string
}

const UserReviewArticle: FunctionComponent<UserReviewArticleProps> = ({
  userReview,
  searchQueryString,
}) => {
  const user = useUser()
  const { openNotification } = useContext(AppContext)
  const navigator = useNavigate()

  const [isLiked, setIsLiked] = useState(false) // add logic default isLiked if user liked this review

  const highLightText = (text: string, searchQueryString: string) => {
    const regex = new RegExp(searchQueryString, "gi")
    const parts = text.split(regex)
    const matches = text.match(regex)
    const result = []
    for (let i = 0; i < parts.length; i++) {
      result.push(parts[i])
      if (matches && i < matches.length) {
        result.push(
          <span className="bg-yellow-400" key={i}>
            {matches[i]}
          </span>
        )
      }
    }
    return result
  }
  const handleLikeClick = () => {
    if (!user?.accessToken) {
      openNotification("warning", {
        message: "Warning",
        description: (
          <div className="flex flex-col">
            <span>You need to sign in to like this review</span>
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
    } else {
      setIsLiked(!isLiked)
    }
  }

  return (
    <div className="UserReviewArticle flex flex-col gap-4">
      <header className="flex justify-between">
        <div className="user-box flex gap-1 items-center">
          <img
            src={userReview.user.avatar}
            className="rounded-full scale-[80%]"
          />
          <div className="flex flex-col">
            <span className="text-[1rem] font-bold">
              {highLightText(userReview.user.name, searchQueryString)}
            </span>
            <span className="text-[0.8rem] text-gray-500">
              {userReview.user.address}
            </span>
          </div>
        </div>
        <div className="tool-box flex items-center">
          <div
            className="like-box flex items-center gap-1 p-1 cursor-pointer rounded-full hover:bg-gray-200"
            onClick={handleLikeClick}
          >
            {isLiked ? (
              <AiFillLike size={25} className="text-primary" />
            ) : (
              <AiOutlineLike size={25} />
            )}
            <span className="text-[0.8rem] text-gray-500">
              {isLiked ? userReview.likes + 1 : userReview.likes}
            </span>
          </div>
          <div className="p-1 cursor-pointer rounded-full hover:bg-gray-200">
            <SlOptionsVertical size={20} />
          </div>
        </div>
      </header>
      <main className="flex flex-col">
        <RatePoint point={userReview.rate} />
        <span className="text-[1rem] font-bold">
          {highLightText(userReview.title, searchQueryString)}
        </span>
        <p>{highLightText(userReview.description, searchQueryString)}</p>
      </main>
      <footer>
        <span className="text-[0.75rem] text-gray-500">
          Written on {userReview.timeWritten}
        </span>
      </footer>
    </div>
  )
}

export default UserReviewArticle
